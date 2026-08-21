import { ContactButton } from "@/components/contact-button";
import { Reveal } from "@/components/reveal";
import data from "@/data.json";

export function Hero() {
  const { hero } = data;

  return (
    <section id="about" className="scroll-mt-[88px]">
      <Reveal id="home-hero-title">
        <h1 className="max-w-[600px] text-[24px] font-medium leading-[31px] tracking-[-0.5px] text-[#141414] sm:text-[26px] sm:leading-[34px]">
          Hey! I&apos;m{" "}
          <span className="bg-[#b8d8f8] text-[#0868d8]">{hero.name}</span>, {hero.tagline}
        </h1>
      </Reveal>
      <Reveal id="home-hero-intro" delay={0.06}>
        <p className="mt-[14px] max-w-[600px] text-[24px] font-medium leading-[31px] tracking-[-0.5px] text-[#141414] sm:text-[26px] sm:leading-[34px]">
          {hero.intro}
        </p>
      </Reveal>
      <Reveal id="home-hero-actions" delay={0.12} className="relative z-10 w-fit">
        <div className="mt-[36px] flex items-center gap-[8px]">
          <ContactButton id="hero-contact" />
          <a
            href={hero.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[36px] items-center rounded-[8px] bg-[#f1f1f1] px-[20px] text-[15px] font-semibold text-[#141414] transition-colors hover:bg-[#e7e7e7]"
          >
            {hero.resumeLabel}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
