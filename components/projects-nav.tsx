"use client";

import { WORK } from "@/lib/projects";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import type { Transition } from "motion/react";
import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";

const SPRING: Transition = {
  type: "spring",
  stiffness: 520,
  damping: 42,
  mass: 0.75,
};

const FADE: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 30,
  mass: 0.9,
};

const INSTANT: Transition = { duration: 0 };
const subscribeToClient = () => () => {};

type ProjectsNavProps = {
  activeId: string;
  visible: boolean;
  onSelect: (id: string) => void;
};

export function ProjectsNavDesktop({
  activeId,
  visible,
  onSelect,
}: ProjectsNavProps) {
  const reduce = useReducedMotion() ?? false;
  const transition = reduce ? INSTANT : SPRING;
  const fade = reduce ? INSTANT : FADE;
  const mounted = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {visible ? (
        <motion.aside
          key="projects-nav-desktop"
          aria-label="Work"
          initial={reduce ? false : { opacity: 0, x: -18, scale: 0.985, filter: "blur(5px)" }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          exit={reduce ? undefined : { opacity: 0, x: -12, scale: 0.99, filter: "blur(3px)" }}
          transition={fade}
          className="pointer-events-none fixed top-1/2 left-[19px] z-20 hidden -translate-y-1/2 origin-left min-[1200px]:block"
        >
          <div className="pointer-events-auto">
            <LayoutGroup id="projects-nav-desktop">
              <ul>
                {WORK.map((project, index) => {
                  const active = project.id === activeId;

                  return (
                    <li key={project.id}>
                      <button
                        type="button"
                        aria-current={active ? "true" : undefined}
                        onClick={() => onSelect(project.id)}
                        className="grid h-[22px] w-full cursor-pointer grid-cols-[35px_1fr] items-center gap-x-[16px] text-left"
                      >
                        <span className="relative flex h-[16px] items-center">
                          <motion.span
                            initial={false}
                            animate={{
                              width: active ? 35 : 19,
                              backgroundColor: active ? "#141414" : "#d0d0d0",
                            }}
                            transition={transition}
                            className="block h-px origin-left"
                          />
                        </span>
                        <motion.span
                          initial={false}
                          animate={{
                            opacity: active ? 1 : 0.45,
                            y: reduce ? 0 : active ? -1 : 0,
                          }}
                          transition={transition}
                          className="whitespace-nowrap text-[13px] font-medium leading-[18px] tracking-[-0.5px] text-[#141414]"
                        >
                          {project.name}
                        </motion.span>
                      </button>

                      {index < WORK.length - 1 ? (
                        <div
                          aria-hidden="true"
                          className="grid h-[11px] grid-cols-[35px_1fr]"
                        >
                          <span className="flex flex-col items-start justify-between py-px">
                            <span className="block h-px w-[19px] bg-[#d0d0d0]" />
                            <span className="block h-px w-[19px] bg-[#d0d0d0]" />
                          </span>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </LayoutGroup>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
