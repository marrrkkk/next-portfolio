"use client";

import { Experience } from "@/components/experience";
import { GithubContributions } from "@/components/github-contributions";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Skills } from "@/components/skills";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [isGameActive, setIsGameActive] = useState(false);

  const handlePlayGame = useCallback(() => setIsGameActive(true), []);
  const handleExitGame = useCallback(() => setIsGameActive(false), []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("play") !== "1") return;
    setIsGameActive(true);
    window.history.replaceState(null, "", "/");
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#141414]">
      <div className="mx-auto w-full max-w-[964px] px-6 pt-[30px] pb-[20px] sm:pb-[28px]">
        <SiteHeader />
        <main className="mt-[106px]">
          <Hero />
          <Projects />
          <Experience />
          <Skills />
          <GithubContributions
            isGameActive={isGameActive}
            onExitGame={handleExitGame}
          />
        </main>
        <SiteFooter
          isGameActive={isGameActive}
          onPlayGame={handlePlayGame}
        />
      </div>
    </div>
  );
}