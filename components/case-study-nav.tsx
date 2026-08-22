"use client";

import { useEffect, useState } from "react";

export function CaseStudyNav({ sections }: { sections: { id: string; text: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const update = () => {
      const line = Math.min(window.innerHeight * 0.3, 240);
      let current = sections[0]?.id ?? "";
      let distance = Number.POSITIVE_INFINITY;
      for (const section of sections) {
        const node = document.getElementById(section.id);
        if (!node) continue;
        const rect = node.getBoundingClientRect();
        const nextDistance = rect.top <= line ? line - rect.top : rect.top - line;
        if (nextDistance < distance && rect.bottom > 88) {
          distance = nextDistance;
          current = section.id;
        }
      }
      setActive((value) => (value === current ? value : current));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  return (
    <aside aria-label="Case study sections" className="fixed top-1/2 left-[19px] z-10 hidden -translate-y-1/2 min-[1200px]:block">
      <ul>
        {sections.map((section, index) => {
          const isActive = section.id === active;
          return (
            <li key={section.id}>
              <a href={`#${section.id}`} className="grid h-[22px] w-full grid-cols-[35px_1fr] items-center gap-x-[16px] text-left">
                <span className="flex h-[16px] items-center"><span className={`block h-px ${isActive ? "w-[35px] bg-[#141414]" : "w-[19px] bg-[#d0d0d0]"}`} /></span>
                <span className={`whitespace-nowrap text-[13px] font-medium leading-[18px] ${isActive ? "text-[#141414]" : "text-[#141414]/45"}`}>{section.text}</span>
              </a>
              {index < sections.length - 1 ? <div aria-hidden="true" className="grid h-[11px] grid-cols-[35px_1fr]"><span className="flex flex-col items-start justify-between py-px"><span className="block h-px w-[19px] bg-[#d0d0d0]" /><span className="block h-px w-[19px] bg-[#d0d0d0]" /></span></div> : null}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

