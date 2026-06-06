"use client";

import { Dock, DockIcon, DockItem, DockLabel } from "./ui/dock";
import { useTheme } from "next-themes";
import Link from "next/link";
import { links } from "@/lib/data";
import { Sun, Moon, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const Nav = () => {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isExternal = (href: string) =>
    href.startsWith("http") || href.startsWith("mailto:");

  const glassItem =
    "dock-liquid-item aspect-square rounded-full";

  const glassItemMobile =
    "w-8 h-8 rounded-full bg-gradient-to-b from-white/70 to-white/40 dark:from-white/[0.18] dark:to-white/[0.08] backdrop-blur-sm backdrop-saturate-200 border border-white/80 dark:border-white/[0.3] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.9),inset_0_-0.5px_0_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.25),inset_0_-0.5px_0_rgba(0,0,0,0.4)] flex items-center justify-center";

  return (
    <>
      {/* Desktop Dock - hidden on mobile */}
      <div className="hidden md:block fixed bottom-3 left-1/2 transform -translate-x-1/2 max-w-full z-50">
        <Dock className="items-end pb-3">
          {links.map((item, index) =>
            item.title === "Theme" ? (
              <DockItem
                key={index}
                className={glassItem}
                onClick={toggleTheme}
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>
                  {mounted && theme === "dark"
                    ? React.createElement(Sun)
                    : React.createElement(Moon)}
                </DockIcon>
              </DockItem>
            ) : (
              <Link
                key={index}
                href={item.href}
                target={isExternal(item.href) ? "_blank" : "_self"}
              >
                <DockItem className={glassItem}>
                  <DockLabel>{item.title}</DockLabel>
                  <DockIcon>{item.icon}</DockIcon>
                </DockItem>
              </Link>
            )
          )}
        </Dock>
      </div>

      {/* Mobile FAB + Menu - visible only on mobile */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        {/* Toggle Button */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-11 h-11 rounded-full bg-gradient-to-b from-white/60 to-white/30 dark:from-white/[0.14] dark:to-white/[0.06] backdrop-blur-md backdrop-saturate-200 border border-white/70 dark:border-white/[0.25] flex items-center justify-center shadow-[inset_0_0.5px_0_rgba(255,255,255,0.8),0_4px_24px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.2),0_4px_24px_rgba(0,0,0,0.4)]"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle navigation menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-14 right-0 bg-gradient-to-b from-white/60 to-white/30 dark:from-white/[0.14] dark:to-white/[0.06] backdrop-blur-md backdrop-saturate-200 border border-white/70 dark:border-white/[0.25] rounded-2xl p-3 shadow-[inset_0_0.5px_0_rgba(255,255,255,0.8),0_4px_24px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0.5px_0_rgba(255,255,255,0.2),0_4px_24px_rgba(0,0,0,0.4)] min-w-[160px]"
            >
              <div className="flex flex-col gap-1">
                {links.map((item, index) =>
                  item.title === "Theme" ? (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      onClick={() => {
                        toggleTheme();
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/30 dark:hover:bg-white/[0.08] transition-colors"
                    >
                      <span className={glassItemMobile}>
                        {mounted && theme === "dark"
                          ? React.createElement(Sun, { size: 16 })
                          : React.createElement(Moon, { size: 16 })}
                      </span>
                      <span className="text-sm font-medium">{item.title}</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        target={isExternal(item.href) ? "_blank" : "_self"}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/30 dark:hover:bg-white/[0.08] transition-colors"
                      >
                        <span className={glassItemMobile}>
                          {React.cloneElement(
                            item.icon as React.ReactElement<{ size?: number }>,
                            { size: 16 }
                          )}
                        </span>
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Nav;
