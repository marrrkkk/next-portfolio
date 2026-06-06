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

  const dockItemClass =
    "aspect-square rounded-full bg-gray-200 dark:bg-neutral-800";

  return (
    <>
      {/* Desktop Dock - hidden on mobile */}
      <div className="hidden md:block fixed bottom-3 left-1/2 transform -translate-x-1/2 max-w-full z-50">
        <Dock className="items-end pb-3">
          {links.map((item, index) =>
            item.title === "Theme" ? (
              <DockItem
                key={index}
                className={dockItemClass}
                onClick={toggleTheme}
                aria-label="Toggle Theme"
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
                rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
              >
                <DockItem className={dockItemClass}>
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
          className="w-11 h-11 rounded-full bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 flex items-center justify-center shadow-sm"
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
              className="absolute top-14 right-0 bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-3 shadow-md min-w-[160px]"
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
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
                      aria-label="Toggle Theme"
                    >
                      <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center">
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
                        rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center">
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
