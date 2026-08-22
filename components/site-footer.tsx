"use client";

import data from "@/data.json";
import { Reveal } from "@/components/reveal";
import { Gamepad2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type FooterProps = {
  onPlayGame?: () => void;
  isGameActive?: boolean;
};

const SOCIAL_LINKS = data.contact.channels;

const SOCIAL_LINK_CLASS = "transition-colors hover:text-[#141414]";

export function SiteFooter({ onPlayGame, isGameActive }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <AnimatePresence>
      {!isGameActive && (
        <motion.div
          key="site-footer"
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
        >
          <Reveal id="site-footer" amount={0.2}>
          <footer className="mt-[48px] pt-[24px] pb-[8px] sm:mt-[64px]">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Left: Copyright */}
            <p className="text-[14px] text-[#7a7a7a]">
              © {currentYear} {data.site.name}
            </p>

            {/* Center: Play a game button */}
            <button
              type="button"
              onClick={() => {
                if (onPlayGame) {
                  onPlayGame();
                  return;
                }
                window.location.assign("/?play=1");
              }}
              className="inline-flex cursor-pointer items-center gap-[10px] rounded-xl bg-[#141414] px-[22px] py-[10px] text-[15px] font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Gamepad2 size={18} strokeWidth={2} />
              <span>Play a game</span>
            </button>

            {/* Right: Social links */}
            <div className="flex items-center gap-[20px] text-[14px] font-medium text-[#7a7a7a]">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={"external" in link ? "_blank" : undefined}
                  rel={"external" in link ? "noopener noreferrer" : undefined}
                  className={SOCIAL_LINK_CLASS}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          </footer>
          </Reveal>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
