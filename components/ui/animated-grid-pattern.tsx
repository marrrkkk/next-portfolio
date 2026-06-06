"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
}: GridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [squares, setSquares] = useState<Array<{ id: number; cx: number; cy: number; delay: number }>>([]);

  // Generate squares once on mount based on container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const { width: w, height: h } = entries[0].contentRect;
      if (w === 0 || h === 0) return;

      const cols = Math.floor(w / width);
      const rows = Math.floor(h / height);
      
      const generated = Array.from({ length: numSquares }, (_, i) => ({
        id: i,
        cx: Math.floor(Math.random() * cols),
        cy: Math.floor(Math.random() * rows),
        delay: Math.random() * (duration + repeatDelay),
      }));
      setSquares(generated);
      observer.disconnect(); // Only need initial size
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [numSquares, width, height, duration, repeatDelay]);

  const animName = `grid-sq-${id.replace(/:/g, "")}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ${animName} {
              0% { opacity: 0; }
              50% { opacity: ${maxOpacity}; }
              100% { opacity: 0; }
            }
          `,
        }}
      />
      <svg
        ref={containerRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
          className
        )}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        <svg x={x} y={y} className="overflow-visible">
          {squares.map((sq) => (
            <rect
              key={sq.id}
              width={width - 1}
              height={height - 1}
              x={sq.cx * width + 1}
              y={sq.cy * height + 1}
              fill="currentColor"
              strokeWidth="0"
              style={{
                animation: `${animName} ${duration}s ease-in-out ${sq.delay}s infinite`,
                opacity: 0,
              }}
            />
          ))}
        </svg>
      </svg>
    </>
  );
}

export default GridPattern;
