"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import dynamic from "next/dynamic";
import data from "@/data.json";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

const ContributionGame = dynamic(
  () => import("./contribution-game").then((mod) => mod.ContributionGame),
  { ssr: false, loading: () => null }
);

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type ContributionResponse = {
  total: {
    [key: string]: number;
    lastYear: number;
  };
  contributions: ContributionDay[];
};

const LEVEL_COLORS = [
  "bg-[#ebebeb] hover:ring-1 hover:ring-[#141414]/30",
  "bg-[#b0b0b0] hover:ring-1 hover:ring-[#141414]/40",
  "bg-[#757575] hover:ring-1 hover:ring-[#141414]/50",
  "bg-[#404040] hover:ring-1 hover:ring-[#141414]/60",
  "bg-[#141414] hover:ring-1 hover:ring-[#141414]",
];

const HIGH_SCORE_KEY = "space_invader_hi_score";
const POINTS_PER_CELL = 10;
const CELL_SIZE_CLASS = "h-[11px] w-[11px] sm:h-[12px] sm:w-[12px] rounded-[2.5px]";
const GRID_GAP_CLASS = "gap-[3.5px] sm:gap-[4px]";

function groupByWeek(contributions: ContributionDay[]) {
  const weeks: ContributionDay[][] = [];
  for (let index = 0; index < contributions.length; index += 7) {
    weeks.push(contributions.slice(index, index + 7));
  }
  return weeks;
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type GithubContributionsProps = {
  isGameActive?: boolean;
  onExitGame?: () => void;
};

export function GithubContributions({
  isGameActive = false,
  onExitGame,
}: GithubContributionsProps) {
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
  const [destroyedBoxes, setDestroyedBoxes] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);

  const scoreRef = useRef(0);
  const highScoreRef = useRef(0);

  // Load high score from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HIGH_SCORE_KEY);
      if (saved) {
        const value = Number(saved);
        highScoreRef.current = value;
        const frame = requestAnimationFrame(() => setHighScore(value));
        return () => cancelAnimationFrame(frame);
      }
    } catch {}
  }, []);

  // Fetch contributions data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${data.github.apiUrl}${data.github.username}?y=last`
        );
        if (!res.ok) return;
        const contribData: ContributionResponse = await res.json();
        const contributions = contribData?.contributions ?? [];

        setWeeks(groupByWeek(contributions));
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  // Responsive uncut columns calculation
  useEffect(() => {
    function updateVisibleColumns() {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const isSm = window.innerWidth >= 640;
      const boxSize = isSm ? 12 : 11;
      const gap = isSm ? 4 : 3.5;
      const colStep = boxSize + gap;

      const count = Math.max(1, Math.floor((width + gap) / colStep));
      setVisibleCount(count);
    }

    updateVisibleColumns();
    window.addEventListener("resize", updateVisibleColumns);
    return () => window.removeEventListener("resize", updateVisibleColumns);
  }, []);

  // Reset game state when activated
  useEffect(() => {
    if (isGameActive) {
      // Smooth scroll to github contributions
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isGameActive]);

  // Clear the board when leaving the game so the next run starts fresh
  const handleExitGame = useCallback(() => {
    setDestroyedBoxes(new Set());
    setScore(0);
    scoreRef.current = 0;
    onExitGame?.();
  }, [onExitGame]);

  // Commit destroyed cells and score together, once per frame of hits
  const handleHit = useCallback((dates: string[]) => {
    if (dates.length === 0) return;

    const newScore = scoreRef.current + dates.length * POINTS_PER_CELL;
    scoreRef.current = newScore;

    setDestroyedBoxes((prev) => {
      const next = new Set(prev);
      for (const date of dates) next.add(date);
      return next;
    });

    setScore(newScore);

    if (newScore > highScoreRef.current) {
      highScoreRef.current = newScore;
      setHighScore(newScore);
      try {
        localStorage.setItem(HIGH_SCORE_KEY, String(newScore));
      } catch {}
    }
  }, []);

  const displayedWeeks =
    visibleCount && weeks.length > visibleCount
      ? weeks.slice(-visibleCount)
      : weeks;

  return (
    <Reveal id="home-github" amount={0.15}>
    <section id="contributions" className="mt-[64px] sm:mt-[100px]">
      {/* Top Header */}
      <div className="mb-[16px] flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-[#141414]">
          {data.github.heading}
        </h2>
        <a
          href={data.github.profileUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-[4px] text-[14px] font-semibold text-[#7a7a7a] transition-colors hover:text-[#141414]"
        >
          @{data.github.username}
          <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>

      {/* Main Grid & Game Arena */}
      <div
        ref={containerRef}
        className={cn(
          "relative w-full overflow-hidden transition-all duration-300",
          isGameActive ? "pb-[54px]" : "pb-[4px]",
        )}
      >
        <div className="flex w-full justify-center">
          <div
            ref={gridWrapperRef}
            className={cn("relative flex w-max", GRID_GAP_CLASS)}
          >
            {/* Canvas and Spaceship, mounted only while the game runs */}
            {isGameActive && (
              <ContributionGame
                containerRef={containerRef}
                gridRef={gridWrapperRef}
                destroyedDates={destroyedBoxes}
                onHit={handleHit}
                onExit={handleExitGame}
              />
            )}

            {/* Contribution Columns */}
            {displayedWeeks.map((week, wIndex) => (
              <div key={wIndex} className={cn("flex flex-col", GRID_GAP_CLASS)}>
                {week.map((day) => {
                  const isDestroyed = destroyedBoxes.has(day.date);
                  const title = `${
                    day.count === 0
                      ? "No contributions"
                      : `${day.count} contribution${day.count === 1 ? "" : "s"}`
                  } on ${formatDate(day.date)}`;

                  return (
                    <div
                      key={day.date}
                      data-contrib-date={day.date}
                      data-contrib-level={day.level}
                      title={title}
                      tabIndex={0}
                      aria-label={title}
                      className={cn(
                        CELL_SIZE_CLASS,
                        "transition-all duration-100",
                        isDestroyed
                          ? "scale-0 opacity-0 pointer-events-none"
                          : [
                              "hover:scale-125 focus:scale-125 focus:outline-none cursor-pointer",
                              LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0],
                            ],
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retro Game HUD Bar: Controls on left (desktop) / Swipe hint (mobile), Score & Exit on right */}
      {isGameActive && (
        <div className="mt-3 flex items-center justify-between font-mono text-[10px] sm:text-[13px] text-[#7a7a7a]">
          {/* Left: Controls guide */}
          <div className="tracking-[-0.5px]">
            <span className="hidden sm:inline">A / D to move · Space to shoot</span>
            <span className="sm:hidden">Swipe to move · Hold to shoot</span>
          </div>

          {/* Right: Score, HI Score, and Exit button */}
          <div className="flex items-center gap-2 tracking-[-0.5px] sm:gap-4">
            <span className="tabular-nums font-semibold text-[#141414]">
              {String(score).padStart(5, "0")}
            </span>
            <span className="tabular-nums text-[#8c8c8c]">
              HI {String(highScore).padStart(5, "0")}
            </span>
            <button
              type="button"
              onClick={handleExitGame}
              className="cursor-pointer font-medium text-[#7a7a7a] transition-colors hover:text-[#141414] underline underline-offset-2"
            >
              Exit
            </button>
          </div>
        </div>
      )}
    </section>
    </Reveal>
  );
}
