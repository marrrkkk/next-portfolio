"use client";

import { ProjectPreview } from "@/components/project-preview";
import { ProjectsNavDesktop } from "@/components/projects-nav";
import { Reveal } from "@/components/reveal";
import { PROJECTS, type Project } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import data from "@/data.json";

const HEADER_OFFSET = 88;

export function Projects() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const [navVisible, setNavVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef(new Map<string, HTMLElement>());

  useEffect(() => {
    const updateFromViewport = () => {
      const section = sectionRef.current;
      if (!section) return;

      const activationLine = Math.min(window.innerHeight * 0.3, 240);
      const nextSection = document.getElementById("skills");
      setNavVisible(
        section.getBoundingClientRect().top <= activationLine &&
          (!nextSection || nextSection.getBoundingClientRect().top > activationLine),
      );
    };

    const handleNavChange = (event: Event) => {
      setNavVisible((event as CustomEvent<string>).detail === "#work");
    };

    updateFromViewport();
    window.addEventListener("site-nav-change", handleNavChange);
    return () => window.removeEventListener("site-nav-change", handleNavChange);
  }, []);

  useEffect(() => {
    let frame = 0;

    const pickActive = () => {
      let nextId: string | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;
      const focusLine = Math.min(window.innerHeight * 0.38, 300);

      for (const project of PROJECTS) {
        const node = itemRefs.current.get(project.id);
        if (!node) continue;

        const rect = node.getBoundingClientRect();
        if (rect.bottom <= HEADER_OFFSET || rect.top >= window.innerHeight) {
          continue;
        }

        const distance =
          focusLine < rect.top
            ? rect.top - focusLine
            : focusLine > rect.bottom
              ? focusLine - rect.bottom
              : 0;

        if (distance < closestDistance) {
          closestDistance = distance;
          nextId = project.id;
        }
      }

      if (!nextId) return;
      setActiveId((current) => (current === nextId ? current : nextId));
    };

    const schedulePickActive = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        pickActive();
      });
    };

    pickActive();
    window.addEventListener("scroll", schedulePickActive, { passive: true });
    window.addEventListener("resize", schedulePickActive);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedulePickActive);
      window.removeEventListener("resize", schedulePickActive);
    };
  }, []);

  const handleSelect = useCallback((id: string) => {
    const node = itemRefs.current.get(id);
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActiveId(id);
    node.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative mt-[64px] scroll-mt-[88px] sm:mt-[100px]"
    >
      <h2 className="sr-only">{data.projects.heading}</h2>
      <ProjectsNavDesktop
        activeId={activeId}
        visible={navVisible}
        onSelect={handleSelect}
      />
      <div className="flex flex-col gap-[40px] sm:gap-[56px]">
        {PROJECTS.map((project) => (
          <ProjectListItem
            key={project.id}
            project={project}
            onNode={(node) => {
              if (node) itemRefs.current.set(project.id, node);
              else itemRefs.current.delete(project.id);
            }}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectListItem({
  project,
  onNode,
}: {
  project: Project;
  onNode: (node: HTMLElement | null) => void;
}) {
  return (
    <article ref={onNode} id={project.id} className="scroll-mt-[88px]">
      <Reveal id={`home-${project.id}`} amount={0.12}>
        <Link href={`/projects/${project.id}`} className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141414]">
        {/* Preview bleeds off the bottom edge, like a cropped screenshot. */}
        <div className="overflow-hidden rounded-[16px] bg-[#f1f1f1] px-[12px] pt-[12px] transition-colors group-hover:bg-[#ececec] sm:px-[20px] sm:pt-[20px]">
          <ProjectPreview accent={project.accent} />
        </div>
        <div className="mt-[14px] flex flex-wrap items-baseline justify-between gap-x-[16px] gap-y-[4px]">
          <div className="flex flex-wrap items-baseline gap-x-[8px] gap-y-[2px]">
            <h3 className="text-[15px] font-semibold text-[#141414]">
              {project.name}
            </h3>
            <p className="hidden text-[15px] font-medium text-[#7a7a7a] sm:inline">
              {project.description}
            </p>
          </div>
          <span className="inline-flex items-center gap-[4px] text-[15px] font-semibold text-[#7a7a7a] transition-colors group-hover:text-[#141414]">
            {data.projects.viewProjectLabel}
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
          </span>
        </div>
        </Link>
      </Reveal>
    </article>
  );
}
