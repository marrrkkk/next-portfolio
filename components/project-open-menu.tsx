"use client";

import { GithubIcon } from "@/components/github-icon";
import type { Work } from "@/lib/projects";
import { ArrowUpRight, Globe, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const ACTION_LINK_CLASS =
  "group flex items-center gap-2 rounded-[9px] px-2 py-2 transition-colors hover:bg-white/10";
const ACTION_ICON_CLASS =
  "inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-white/10";

type ActionItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

export function ProjectOpenMenu({ project }: { project: Work }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const titleId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const actions: ActionItem[] = [
    ...(project.live
      ? [{
          href: project.link,
          label: "Live site",
          icon: <Globe size={14} strokeWidth={2} aria-hidden="true" />,
        }]
      : []),
    {
      href: project.github,
      label: "GitHub",
      icon: <GithubIcon className="h-[14px] w-[14px]" />,
    },
  ];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  return (
    <div ref={menuRef} className="relative inline-flex">
      {/* Reserve the closed trigger's footprint so opening the card never changes
          the project header height or pushes the page content down. */}
      <span
        aria-hidden="true"
        className="invisible inline-flex h-[36px] items-center gap-[6px] px-[16px] text-[15px] font-semibold"
      >
        Visit site
        <ArrowUpRight size={14} strokeWidth={2} />
      </span>

      {open
        ? createPortal(
            <button
              type="button"
              aria-label="Close visit menu"
              className="pointer-events-none fixed inset-0 z-[9] cursor-default"
              onClick={() => setOpen(false)}
            />,
            document.body,
          )
        : null}

      <motion.div
        layout
        animate={{ borderRadius: open ? 18 : 8 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                layout: open
                  ? { type: "spring", stiffness: 380, damping: 28, mass: 1.2 }
                  : { type: "spring", stiffness: 560, damping: 52, mass: 1.2 },
              }
        }
        className="absolute top-0 right-0 z-20 flex min-h-[36px] overflow-hidden bg-[#141414] text-white"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            <motion.div
              key="links"
              layout="position"
              initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, y: 4, scale: 0.98, filter: "blur(4px)" }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 460,
                      damping: 32,
                      mass: 0.85,
                      opacity: { duration: 0.32 },
                      filter: { duration: open ? 0.32 : 0.16 },
                    }
              }
              role="dialog"
              aria-labelledby={titleId}
              className="w-[220px] shrink-0 p-[14px]"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 id={titleId} className="text-[14px] font-semibold text-white">Visit</h2>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close visit menu"
                  className="-mr-1 -mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={14} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>

              <div className="mt-3 flex flex-col gap-1">
                {actions.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      window.open(href, "_blank", "noopener,noreferrer");
                    }}
                    className={`${ACTION_LINK_CLASS} cursor-pointer`}
                  >
                    <span className={ACTION_ICON_CLASS}>{icon}</span>
                    <span className="text-[13px] font-medium">{label}</span>
                    <ArrowUpRight size={14} className="ml-auto text-white/45 transition-colors group-hover:text-white" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="trigger" layout="position" initial={false} className="inline-flex shrink-0">
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={open}
                className="inline-flex h-[36px] items-center justify-center gap-[6px] px-[16px] text-[15px] font-semibold text-white transition-colors hover:bg-[#333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
              >
                Visit site
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
