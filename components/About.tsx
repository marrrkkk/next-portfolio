"use client";


import BlurIn from "./ui/blur-in";

const About = () => {
  return (
    <div className="mt-96 flex justify-center">
      <BlurIn
        word="Full-Stack Developer based in the Philippines"
        className="font-medium text-3xl w-[90%] md:text-4xl md:w-[60%]"
      />
    </div>
  );
};

export default About;
