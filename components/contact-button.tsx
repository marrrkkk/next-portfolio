"use client";

import { ArrowUpRight, Code, Mail, Send, Users, X } from "lucide-react";
import data from "@/data.json";
import {
  AnimatePresence,
  motion,
  stagger,
  useReducedMotion,
} from "motion/react";
import type { Transition, Variants } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * One shell, two contents.
 *
 * The dark surface is a single persistent element carrying `layoutId`, so the
 * button doesn't hand off to a card — it *is* the card once Motion has
 * projected it onto the card's box. Only the content inside swaps, and
 * `mode="popLayout"` lifts the outgoing content out of flow so the shell can
 * measure the incoming content on the same frame. That's what lets "Contact"
 * fade out *during* the expansion instead of before it, and come back *during*
 * the contraction instead of after it.
 *
 * Two elements sharing a `layoutId` would crossfade instead (Motion's
 * documented behaviour when both stay mounted), which washes out an opaque fill
 * and reads as a modal swap — the thing this interaction is avoiding.
 */
const SHELL_ID = "contact-shell";

const SHELL_BG = "bg-[#1a1a1a]";
const TRIGGER_HEIGHT = "h-[36px]";
const TRIGGER_TEXT = "text-[15px] font-semibold";
const TRIGGER_GAP = "gap-[6px]";
const TRIGGER_PADDING = "px-[20px]";
const CARD_WIDTH = "w-[min(360px,calc(100vw-48px))] shrink-0";
const ICON_BUTTON = "inline-flex h-[26px] w-[26px] shrink-0 cursor-pointer items-center justify-center rounded-full";
const BUTTON_RADIUS = 8;
const CARD_RADIUS = 18;

// Decelerate into place / leave promptly. Never `ease-in-out`.
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN = [0.4, 0, 1, 1] as const;

const ICON_MAP: Record<string, typeof Mail> = {
  "Email": Mail,
  "GitHub": Code,
  "LinkedIn": Users,
};

const CHANNELS = data.contact.channels.map((channel) => ({
  ...channel,
  icon: ICON_MAP[channel.label],
}));

type ContactButtonProps = {
  /** `right` pins the shell to the trigger's right edge so it grows left. */
  align?: "left" | "right";
  /** Icon-only below `sm` — used by the header-docked trigger so it doesn't collide with the tab. */
  compact?: boolean;
  id?: string;
};

export function ContactButton({
  align = "left",
  compact = false,
  id,
}: ContactButtonProps) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  const titleId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const expandLeft = align === "right";
  // Two mounted instances (hero + header) must not share a layoutId or Motion
  // crossfades them instead of treating each shell as its own morph.
  const shellId = expandLeft ? `${SHELL_ID}-docked` : SHELL_ID;

  /**
   * Damping ratio ~0.76: fast acceleration, ~2% overshoot, settled around 300ms
   * with no second bounce. The shell leads and everything else is timed against
   * it. Reduced motion drops to a straight cut — the state change still works,
   * it just doesn't travel.
   */
  const shellTransition: Transition = reduceMotion
    ? { duration: 0 }
    : {
        layout: open
          ? { type: "spring", stiffness: 380, damping: 28, mass: 1.2 }
          : { type: "spring", stiffness: 560, damping: 52, mass: 1.2 },
        // Radius rides along slightly flatter so the corners don't wobble.
        borderRadius: {
          type: "spring",
          stiffness: open ? 380 : 560,
          damping: open ? 34 : 52,
          mass: 1.2,
        },
      };

  /**
   * The layers only orchestrate and gate pointer events. Nothing here animates a
   * transform: they're projection nodes correcting the shell's scale, and a
   * competing transform would fight that correction. `pointerEvents: "none"` on
   * the way out also releases the trigger's `:hover` fill, so the outgoing
   * button doesn't sit there lit up while the shell expands past it.
   */
  const triggerLayer: Variants = {
    hidden: { pointerEvents: "none" },
    visible: {
      pointerEvents: "auto",
      // Label is already on its way back while the shell is still contracting.
      transition: { delayChildren: reduceMotion ? 0 : 0.04 },
    },
  };

  const cardLayer: Variants = {
    hidden: { pointerEvents: "none" },
    visible: {
      pointerEvents: "auto",
      transition: {
        // Title ~60ms in, then 30ms apart: one coherent reveal, not a cascade.
        // (`staggerChildren` is deprecated in Motion 13 in favour of this.)
        delayChildren: reduceMotion ? 0 : stagger(0.03, { startDelay: 0 }),
      },
    },
  };

  /**
   * "Contact" is displaced by the container rather than deleted: a few pixels
   * up, a hair smaller, gone in ~120ms — before the shell has finished growing.
   * The same variant plays in reverse on close.
   */
  const label: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : -3,
      scale: reduceMotion ? 1 : 0.96,
      transition: { duration: reduceMotion ? 0.1 : 0.18, ease: EASE_IN },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduceMotion
        ? { duration: 0.12 }
        : {
            opacity: { duration: 0.24, ease: EASE_OUT },
            default: { type: "spring", stiffness: 420, damping: 36, mass: 0.8 },
          },
    },
  };

  /**
   * Card content: starts a touch low and a touch small, lands with the shell.
   * Small enough that it reads as settling, not as flying in.
   */
  const cardItem: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 6,
      scale: 1,
      filter: reduceMotion ? "blur(0px)" : "blur(4px)",
      // Leaves all at once, quickly, so the contraction isn't dragging content.
      transition: reduceMotion
        ? { duration: 0.1 }
        : {
            duration: 0.3,
            filter: { duration: open ? 0.3 : 0.16, ease: EASE_IN },
          },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: reduceMotion
        ? { duration: 0.12 }
        : {
            opacity: { duration: 0.32, ease: EASE_OUT },
            filter: { duration: 0.32, ease: EASE_OUT },
            default: { type: "spring", stiffness: 460, damping: 32, mass: 0.85 },
          },
    },
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Hero only: if the open card scrolls under the sticky header, close it.
  // The docked trigger *lives* in that 72px band, so the same observer would
  // fire on open and slam the card shut.
  useEffect(() => {
    if (!open || expandLeft) return;
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setOpen(false);
      },
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  // `expandLeft` is derived from the `align` prop which is constant for a given
  // instance — omitting it avoids a hot-reload dependency-size mismatch while
  // keeping the effect correct (early-return when expandLeft is true).
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Move focus into the card on open, hand it back to the trigger on close.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  const triggerPad = compact ? "px-[11px] sm:px-[20px]" : TRIGGER_PADDING;
  const labelClass = compact ? "sr-only sm:not-sr-only" : undefined;

  return (
    <div id={id} ref={wrapperRef} className="relative inline-flex">
      {/* Holds the trigger's footprint so the hero row never shifts mid-morph. */}
      <span
        aria-hidden="true"
        className={`invisible inline-flex ${TRIGGER_HEIGHT} items-center ${TRIGGER_GAP} ${triggerPad} ${TRIGGER_TEXT}`}
      >
        <Send size={14} strokeWidth={2} />
        <span className={compact ? "hidden sm:inline" : undefined}>{data.contact.buttonLabel}</span>
      </span>

      {/* Portaled so a transformed ancestor (the header pop-in) can't trap
          `position: fixed` into the 36px trigger box. z-9 stays under the
          shell (z-20) and the sticky tab (z-30). */}
      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-[9]"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />,
            document.body,
          )
        : null}

      <motion.div
        layout
        layoutId={shellId}
        layoutDependency={open}
        // Scale projection grows from the pinned edge: top-left in the hero,
        // top-right when docked, so the card doesn't bloom across the tab.
        style={{ originX: expandLeft ? 1 : 0, originY: 0 }}
        // Animating the radius (rather than swapping a class) is also what lets
        // Motion correct it against the projection scale.
        animate={{ borderRadius: open ? CARD_RADIUS : BUTTON_RADIUS }}
        transition={shellTransition}
        // `flex`, not block: an inline-level child would add a line-box strut and
        // the closed shell would no longer be exactly 36px tall.
        // z-20 keeps the shell above page content and above the nav tab (z-10)
        // during exit animations. The hero trigger still tucks under the sticky
        // header (z-30) because 20 < 30.
        className={`absolute top-0 z-20 flex overflow-hidden ${SHELL_BG} ${
          expandLeft ? "right-0" : "left-0"
        }`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            // Padding sits on the inner element, not the layer: `popLayout` pins
            // the outgoing layer to its measured content box, so a padded layer
            // would reflow its own text on the way out. `shrink-0` keeps the
            // width honest too — the shell is absolutely positioned inside a
            // 110px wrapper, and a shrinkable item would let it shrink-to-fit.
            <motion.div
              key="card"
              layout="position"
              variants={cardLayer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={CARD_WIDTH}
            >
              <div className="p-[18px]">
                <motion.div
                  variants={cardItem}
                  className="flex items-start justify-between gap-[12px]"
                >
                  <div>
                    <h3
                      id={titleId}
                      className="text-[15px] font-semibold text-white"
                    >
                      {data.contact.heading}
                    </h3>
                    <p className="mt-[4px] text-[13px] leading-[18px] text-white/55">
                      {data.contact.description}
                    </p>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close contact card"
                    className={`${ICON_BUTTON} -mt-[2px] -mr-[2px] text-white/55 transition-colors hover:bg-white/10 hover:text-white`}
                  >
                    <X size={14} strokeWidth={2} aria-hidden="true" />
                  </button>
                </motion.div>

                <div className="mt-[14px] flex flex-col gap-[2px]">
                  {CHANNELS.map((channel) => {
                    const Icon = channel.icon;

                    return (
                      <motion.a
                        key={channel.label}
                        variants={cardItem}
                        href={channel.href}
                        target={channel.external ? "_blank" : undefined}
                        rel={channel.external ? "noreferrer" : undefined}
                        className="group flex items-center gap-[10px] rounded-[10px] px-[8px] py-[8px] transition-colors hover:bg-white/[0.07]"
                      >
                        <span className="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[9px] bg-white/10 text-white">
                          <Icon size={14} strokeWidth={2} aria-hidden="true" />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="text-[13px] leading-[16px] font-medium text-white">
                            {channel.label}
                          </span>
                          <span className="truncate text-[12px] leading-[16px] text-white/50">
                            {channel.value}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={14}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="ml-auto shrink-0 text-white/35 transition-colors group-hover:text-white"
                        />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="trigger"
              layout="position"
              variants={triggerLayer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="inline-flex shrink-0"
            >
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-label="Contact"
                // Inset focus ring: the shell clips overflow, so an outline sitting
                // outside the border box would be cut off.
                className={`inline-flex ${TRIGGER_HEIGHT} cursor-pointer items-center justify-center ${TRIGGER_GAP} ${triggerPad} ${TRIGGER_TEXT} text-white transition-colors hover:bg-[#333] focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-white/70`}
              >
                <motion.span
                  variants={label}
                  className="inline-flex items-center gap-[6px]"
                >
                  <Send size={14} strokeWidth={2} aria-hidden="true" />
                  <span className={labelClass}>{data.contact.buttonLabel}</span>
                </motion.span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
