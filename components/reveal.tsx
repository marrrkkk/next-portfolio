"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

const completedReveals = new Set<string>();
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  id: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
};

export function Reveal({
  id,
  children,
  className,
  delay = 0,
  amount = 0.18,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, amount });
  const completed = completedReveals.has(id);
  const visible = completed || inView || reduceMotion;

  return (
    <motion.div
      ref={ref}
      initial={completed || reduceMotion ? false : {
        opacity: 0,
        y: 18,
        scale: 0.992,
        filter: "blur(6px)",
      }}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 18, scale: 0.992, filter: "blur(6px)" }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.62, delay, ease: EASE_OUT }
      }
      onAnimationComplete={() => {
        if (visible) completedReveals.add(id);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
