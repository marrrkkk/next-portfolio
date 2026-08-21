import data from "@/data.json";
import { Reveal } from "@/components/reveal";

const EXPERIENCES = data.experience.items;

export function Experience() {
  return (
    <Reveal id="home-experience" amount={0.15}>
    <section id="skills" className="mt-[64px] scroll-mt-[88px] sm:mt-[100px]">
      <h2 className="mb-[16px] text-[15px] font-semibold leading-[20px] text-[#141414]">
        {data.experience.heading}
      </h2>
      <div className="border-t border-[#dedede]">
        {EXPERIENCES.map((item, index) => (
          <article
            key={`${item.year}-${item.role}-${index}`}
            className="border-b border-[#dedede] py-[16px] sm:py-[17px]"
          >
            <div className="text-[15px] font-semibold leading-[20px] tracking-[-0.5px] text-[#141414]">
              {item.company}
            </div>
            <div className="mt-[6px] flex items-start justify-between gap-[20px] text-[15px] font-medium leading-[20px] tracking-[-0.5px]">
              <span className="min-w-0 text-[#666666]">{item.role}</span>
              <span className="shrink-0 text-right text-[13px] font-medium leading-[20px] text-[#a0a0a0]">
                {item.year}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
    </Reveal>
  );
}
