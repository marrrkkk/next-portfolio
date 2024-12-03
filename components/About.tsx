"use client";

import { useInView } from "react-intersection-observer";
import BlurIn from "./ui/blur-in";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="mt-96 flex justify-center">
      {inView && (
        <BlurIn
          word="Full-Stack Developer and Designer based in the Philippines"
          className="font-medium text-3xl w-[90%] md:text-4xl md:w-[60%]"
        />
      )}
    </div>
  );
};

export default About;
