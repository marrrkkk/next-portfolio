"use client"; // This ensures that the component runs on the client side

import { useState, useEffect } from "react"; // Adjust import as needed
import { ChevronDown, Mouse } from "lucide-react"; // Adjust import as needed

const ScrollButton = () => {
  const [opacity, setOpacity] = useState(1);

  // Handle scroll event to fade the ChevronDown
  const handleScroll = () => {
    const scrollY = window.scrollY;
    setOpacity(Math.max(1 - scrollY / 200, 0)); // Decrease opacity as you scroll
  };

  // Scroll the page when the ChevronDown is clicked
  const handleClick = () => {
    window.scrollBy({
      top: 500, // Scroll down by 200px
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
      <div
        className="absolute top-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        style={{ opacity }}
        onClick={handleClick}
      >
        <Mouse strokeWidth={1} />
        <ChevronDown
          className="animate-bounce"
          strokeWidth={1}
        />
      </div>
    </div>
  );
};

export default ScrollButton;
