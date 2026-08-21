import data from "@/data.json";
import { Reveal } from "@/components/reveal";
import type { SVGProps } from "react";

type SkillIconData = {
  viewBox: string;
  fill?: string;
  fillRule?: "evenodd" | "nonzero";
  paths: string[];
};

function SkillIcon({ icon }: { icon: SkillIconData }) {
  const svgProps: SVGProps<SVGSVGElement> = {
    viewBox: icon.viewBox,
    fill: icon.fill,
    "aria-hidden": true,
    className: "h-[16px] w-[16px] shrink-0",
    dangerouslySetInnerHTML: { __html: icon.paths.join("") },
  };
  if (icon.fillRule) {
    svgProps.fillRule = icon.fillRule;
  }
  return <svg {...svgProps} />;
}

export function Skills() {
  return (
    <Reveal id="home-tech-stack" amount={0.15}>
    <section id="tech-stack" className="mt-[64px] sm:mt-[100px]">
      <h2 className="mb-[16px] text-[15px] font-semibold text-[#141414]">
        {data.skills.heading}
      </h2>
      <div className="flex flex-wrap gap-[10px]">
        {data.skills.items.map(({ name, icon }) => (
          <div
            key={name}
            className="inline-flex items-center gap-[8px] rounded-full bg-[#f1f1f1] px-[16px] py-[9px] text-[15px] font-medium text-[#141414] transition-colors hover:bg-[#e7e7e7]"
          >
            <SkillIcon icon={icon as SkillIconData} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
    </Reveal>
  );
}
