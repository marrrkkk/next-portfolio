"use client";

import { ContactButton } from "@/components/contact-button";
import { Inbox, Layers, Pencil } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import data from "@/data.json";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";

/**
 * Scroll-driven site header — the tab slides over the avatar.
 *
 * On scroll the segmented nav ("tab") translates left until its left edge sits
 * exactly where the avatar's left edge was, covering it. The avatar fades out
 * in step so it's fully hidden — the tab is a couple px shorter than the 45px
 * avatar circle, so an opaque cover alone would leave slivers peeking above and
 * below.
 *
 * Nothing about the tab's *styling* changes — only its horizontal position.
 * Everything reads from a single MotionValue (`progress`, 0 → 1) so the motion
 * runs on Motion's rAF loop and never triggers a React re-render on scroll.
 *
 * `progress` is the scroll fraction over the first ~120px, spring-smoothed. The
 * spring carries real momentum into place and settles, rather than tracking the
 * pointer 1:1. Damping is near-critical (ζ≈0.98) so it settles fast *without* a
 * visible bounce.
 *
 * No layout shift: `x` and `opacity` are transform/paint only, so the header
 * stays 45px tall throughout — `app/page.tsx` (`main mt-[106px]`) needs no change.
 */

type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ICONS: LucideIcon[] = [Layers, Inbox, Pencil];

const NAV: NavLink[] = data.nav.map((item, index) => ({
  ...item,
  icon: NAV_ICONS[index],
}));

// The avatar's footprint: a 45px circle plus the 7px flex gap to the nav. The
// nav slides left by exactly this much so its left edge lands where the
// avatar's left edge was.
const AVATAR = 45;
const GAP = 7;

// The slide completes over the first 120px of scroll. Past that, `clamp` holds
// the tab in its settled position over the avatar.
const SCROLL_RANGE = 120;

// Treat the hero trigger as gone once it slips under the sticky header
// (12px offset + 45px header + a few px of slack), not the viewport edge.
const HERO_CONTACT_ROOT_MARGIN = "-72px 0px 0px 0px";
const HERO_CONTACT_HIDE_AT = 72;

export function SiteHeader() {
  // `useReducedMotion()` can be null before the media query resolves; treat only
  // an explicit `true` as reduced. Same guard the ContactButton uses.
  const reduce = useReducedMotion() ?? false;
  const [docked, setDocked] = useState(false);
  const [activeHref, setActiveHref] = useState(NAV[0].href);
  const navigationLock = useRef(false);
  const navigationUnlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();
  const scrollDriven = useSpring(
    useTransform(scrollY, [0, SCROLL_RANGE], [0, 1], { clamp: true }),
    // ζ ≈ 0.98 — effectively critically damped: quick, momentum-carrying, no bounce.
    { stiffness: 400, damping: 36, mass: 0.85 },
  );

  // Reduced motion pins progress at 0 forever: the tab sits in its original spot
  // and never reacts to scroll. Keeping the same element/values (rather than a
  // separate static branch) means the server and client render the exact same
  // markup at scroll 0 — no hydration mismatch. Both hooks are always called, so
  // the rules of hooks hold.
  const stationary = useMotionValue(0);
  const progress = reduce ? stationary : scrollDriven;

  // The only two things that move: the nav slides left onto the avatar's spot,
  // and the avatar fades as the opaque, higher-z tab wipes over it.
  const navX = useTransform(progress, [0, 1], [0, -(AVATAR + GAP)]);
  const avatarOpacity = useTransform(progress, [0, 1], [1, 0]);

  // When the hero Contact button leaves the visible area (covered by this
  // header), a matching trigger pops in on the right so contact stays reachable.
  useLayoutEffect(() => {
    const target = document.getElementById("hero-contact");
    if (!target) return;

    const update = () => {
      setDocked(target.getBoundingClientRect().bottom < HERO_CONTACT_HIDE_AT);
    };
    update();

    const observer = new IntersectionObserver(
      ([entry]) => setDocked(!entry.isIntersecting),
      { threshold: 0, rootMargin: HERO_CONTACT_ROOT_MARGIN },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    let frame = 0;

    const updateActiveLink = () => {
      if (navigationLock.current) return;

      const activationLine = Math.min(window.innerHeight * 0.3, 240);
      let nextActiveHref = NAV[0].href;

      for (const item of NAV) {
        const section = document.getElementById(item.href.slice(1));
        if (section && section.getBoundingClientRect().top <= activationLine) {
          nextActiveHref = item.href;
        }
      }

      setActiveHref((current) =>
        current === nextActiveHref ? current : nextActiveHref,
      );
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateActiveLink();
      });
    };

    updateActiveLink();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (navigationUnlockTimer.current) {
        clearTimeout(navigationUnlockTimer.current);
      }
    };
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const section = document.getElementById(href.slice(1));
    if (!section) return;

    event.preventDefault();
    navigationLock.current = true;
    setActiveHref(href);

    if (navigationUnlockTimer.current) {
      clearTimeout(navigationUnlockTimer.current);
    }
    navigationUnlockTimer.current = setTimeout(() => {
      navigationLock.current = false;
    }, reduce ? 0 : 900);

    section.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }
  };

  const dockTransition = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 500, damping: 32, mass: 0.7 };

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("site-nav-change", { detail: activeHref }),
    );
  }, [activeHref]);

  return (
    // Sticky so the header stays on-screen while scrolling — otherwise the slide
    // would happen off-screen. `top-3` pins it ~12px from the top. `z-30` keeps
    // the tab above page content (including the hero contact shell at z-20) so
    // the trigger never paints over the nav as it scrolls past.
    <header className="sticky top-3 z-30 flex items-center justify-between gap-3">
      <div className="flex items-center gap-[7px]">
        {/* Avatar: fixed 45px circle that fades out as the tab covers it. `fill`
            requires the wrapper to be positioned (`relative`). */}
        <motion.div
          style={{ opacity: avatarOpacity }}
          className="relative h-[45px] w-[45px] shrink-0 overflow-hidden rounded-full"
        >
          <Image
            src={data.site.avatar}
            alt={data.site.avatarAlt}
            fill
            sizes="128px"
            quality={100}
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Segmented tab nav — styling is byte-for-byte the original; only its
            horizontal position animates. `position`/`zIndex` live in the style
            prop (not the className), and its opaque gray fill makes it paint over
            the avatar as it slides across. */}
        <motion.nav
          layout
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 650, damping: 38, mass: 0.5 }
          }
          style={{
            x: navX,
            position: "relative",
            zIndex: 10,
            willChange: "transform",
          }}
          className="flex items-center gap-[2px] rounded-md bg-[#efefef] p-[4px]"
        >
          {NAV.map(({ href, label, icon: Icon }) => {
            const current = activeHref === href;

            return (
              <motion.a
                layout
                key={href}
                href={href}
                aria-current={current ? "location" : undefined}
                onClick={(event) => handleNavClick(event, href)}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 650, damping: 38, mass: 0.5 }
                }
                className={
                  current
                    ? "flex items-center gap-[6px] rounded-md bg-white px-[15px] py-[9px] text-[14px] font-semibold leading-none text-[#141414] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.05)]"
                    : "flex items-center rounded-full px-[15px] py-[9px] text-[14px] font-medium leading-none text-[#7a7a7a] transition-colors hover:text-[#141414]"
                }
              >
                {current ? (
                  <motion.span
                    initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 700, damping: 35, mass: 0.45 }
                    }
                    className="inline-flex h-[15px] w-[15px] shrink-0 items-center justify-center"
                  >
                    <Icon size={15} strokeWidth={2} aria-hidden="true" />
                  </motion.span>
                ) : null}
                {label}
              </motion.a>
            );
          })}
        </motion.nav>
      </div>

      <AnimatePresence>
        {docked ? (
          <motion.div
            key="docked-contact"
            initial={reduce ? false : { opacity: 0, y: -8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -8, scale: 0.92 }}
            transition={dockTransition}
            className="shrink-0"
          >
            <ContactButton align="right" compact />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
