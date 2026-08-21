import { ProjectOpenMenu } from "@/components/project-open-menu";
import { ProjectPreview } from "@/components/project-preview";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import type { Work } from "@/lib/projects";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import data from "@/data.json";

export function ProjectDetail({ project }: { project: Work }) {
  return (
    <div className="min-h-screen bg-white font-sans text-[#141414]">
      <div className="mx-auto flex min-h-screen w-full max-w-[964px] flex-col px-6 pt-[30px] pb-[20px] sm:pb-[28px]">
        <Reveal id={`project-${project.id}-header`}>
        <header className="flex items-center justify-between gap-3">
          <Link
            href="/#work"
            className="inline-flex h-[36px] min-w-[44px] cursor-pointer items-center justify-center gap-[8px] rounded-[8px] bg-[#efefef] px-[16px] text-[15px] font-semibold text-[#141414] transition-colors hover:bg-[#e7e7e7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
          >
            <Undo2 size={15} strokeWidth={2} aria-hidden="true" />
            {data.work.returnLabel}
          </Link>
          <ProjectOpenMenu project={project} />
        </header>
        </Reveal>

        <main className="mt-[80px] flex-1 sm:mt-[80px]">
          <Reveal id={`project-${project.id}-intro`}>
          <div className="mx-auto max-w-[680px]">
            <p className="text-[11px] font-medium leading-[16px] tracking-[-0.5px] text-[#9a9a9a]">
              {project.role} / {project.timeline}
            </p>
            <h1 className="mt-[18px] text-[40px] font-semibold leading-[1] tracking-[-0.5px] text-[#0d0d0d] sm:text-[60px] sm:leading-[1]">
              {project.name}
            </h1>
            <p className="mt-[20px] max-w-[650px] text-[20px] font-medium leading-[27.5px] tracking-[-0.5px] text-[#777777]">
              {project.longDescription ?? project.description}
            </p>
          </div>
          </Reveal>

          <Reveal id={`project-${project.id}-stack`} delay={0.06}>
          <ul className="mx-auto mt-[30px] flex max-w-[680px] flex-wrap items-center gap-[6px]">
            {project.tech.map((item) => (
              <li
                key={item}
                className="inline-flex h-[30px] items-center rounded-[8px] border border-[#e2e2e2] bg-transparent px-[10px] text-[10px] font-medium leading-none tracking-[-0.5px] text-[#777777]"
              >
                {item}
              </li>
            ))}
          </ul>
          </Reveal>

          <Reveal id={`project-${project.id}-preview`} amount={0.12}>
          <div className="mx-auto mt-[58px] max-w-[680px] overflow-hidden rounded-[10px] bg-[#f3f3f3]">
            <ProjectPreview image={project.image} alt={`${project.name} preview`} />
          </div>
          </Reveal>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
