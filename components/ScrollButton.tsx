"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown, Mouse } from "lucide-react";

const ScrollButton = () => {
  const [opacity, setOpacity] = useState(1);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(() => {
        setOpacity(Math.max(1 - window.scrollY / 200, 0));
        ticking.current = false;
      });
    }
  }, []);

  const handleClick = () => {
    window.scrollBy({
      top: 500,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="relative w-full h-full">
      <button
        className="absolute top-44 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        style={{ opacity }}
        onClick={handleClick}
        aria-label="Scroll down"
      >
        <Mouse strokeWidth={1.3} />
        <ChevronDown
          className="animate-bounce"
          strokeWidth={1.3}
        />
      </button>
    </div>
  );
};

export default ScrollButton;
