"use client"; // This ensures that the component runs on the client side

import { useState, useEffect } from "react"; // Adjust import as needed
import { ChevronDown } from "lucide-react"; // Adjust import as needed

const ScrollButton = () => {
  const [opacity, setOpacity] = useState(1);

  // Handle scroll event to fade the button
  const handleScroll = () => {
    const scrollY = window.scrollY;
    setOpacity(Math.max(1 - scrollY / 200, 0)); // Decrease opacity as you scroll
  };

  // Scroll the page when the button is clicked
  const handleClick = () => {
    window.scrollBy({
      top: 500, // Scroll down by 500px
      behavior: "smooth", // Smooth scroll effect
    });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <svg
        className="absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
        focusable="false"
      >
        <filter id="scroll-liquid-glass-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.04"
            numOctaves="2"
            seed="13"
            result="map"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.35" result="blur" />
          <feDisplacementMap
            in="blur"
            in2="map"
            scale="16"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <button
        type="button"
        aria-label="Scroll down"
        className="scroll-liquid-button group absolute top-44 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-[55%] active:scale-95"
        style={{ opacity }}
        onClick={handleClick}
      >
        {/* Glossy specular highlight on the top half */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/60 to-transparent dark:from-white/30 opacity-80"
        />
        {/* Soft glow ring on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-[0_0_18px_rgba(255,255,255,0.35)] dark:shadow-[0_0_18px_rgba(255,255,255,0.18)]"
        />
        <ChevronDown
          className="relative drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:translate-y-0.5"
          strokeWidth={2}
          size={22}
        />
      </button>
    </div>
  );
};

export default ScrollButton;
