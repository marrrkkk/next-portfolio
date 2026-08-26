import { ProjectOpenMenu } from "@/components/project-open-menu";
import { CaseStudyNav } from "@/components/case-study-nav";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import type { Work } from "@/lib/projects";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import data from "@/data.json";
import { getCaseStudy, type CaseStudyBlock } from "@/lib/case-studies";

export function ProjectDetail({ project }: { project: Work }) {
  const blocks = getCaseStudy(project.id);
  const sections = blocks.filter((block): block is Extract<CaseStudyBlock, { type: "heading" }> => block.type === "heading" && block.level === 2).map(({ id, text }) => ({ id, text }));
  return (
    <div className="min-h-screen bg-white font-sans text-[#141414]">
      <div className="mx-auto flex min-h-screen w-full max-w-[964px] flex-col px-6 pt-[30px] pb-[20px] sm:pb-[28px]">
        <Reveal id={`project-${project.id}-header`} className="relative z-30">
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

        {sections.length ? <CaseStudyNav sections={sections} /> : null}
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
          <div className="mx-auto mt-[58px] max-w-[680px]">
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              width={1440}
              height={900}
              sizes="(max-width: 640px) 100vw, 680px"
              className="h-auto w-full rounded-[10px]"
            />
          </div>
          </Reveal>

          {project.images?.map((src, index) => (
            <Reveal key={src} id={`project-${project.id}-image-${index}`} amount={0.06} className="mx-auto mt-[24px] max-w-[680px]">
              <Image
                src={src}
                alt={`${project.name} screenshot ${index + 1}`}
                width={1440}
                height={900}
                sizes="(max-width: 640px) 100vw, 680px"
                className="h-auto w-full rounded-[10px]"
              />
            </Reveal>
          ))}

          {blocks.length ? (
            <Reveal id={`project-${project.id}-case-study`} amount={0.06}>
              <article className="mx-auto mt-[84px] max-w-[680px] border-t border-[#e5e5e5] pt-[44px]">
                {blocks.map((block, index) => {
                  if (block.type === "heading") {
                    const Tag = block.level === 2 ? "h2" : "h3";
                    return <Tag key={`${block.id}-${index}`} id={block.id} className={block.level === 2 ? "mb-[18px] mt-[48px] scroll-mt-[100px] text-[24px] font-semibold leading-[1.1] text-[#141414] first:mt-0" : "mb-[12px] mt-[30px] text-[16px] font-semibold text-[#141414]"}>{block.text}</Tag>;
                  }
                  if (block.type === "list") return <ul key={index} className="mb-[24px] list-disc space-y-[8px] pl-[20px] text-[16px] leading-[1.6] text-[#676767]">{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
                  return <p key={index} className="mb-[24px] text-[16px] leading-[1.65] text-[#676767]">{block.text}</p>;
                })}
              </article>
            </Reveal>
          ) : null}
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
