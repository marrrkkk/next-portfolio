import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import BoxReveal from "./ui/box-reveal";
import GridPattern from "./ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ResumeButton from "./ResumeButton";
import ScrollButton from "./ScrollButton";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="mt-64">
      <div>
        <div className="flex items-center space-x-1">
          <BoxReveal boxColor="black" duration={0.5}>
            <Image
              src="/me.png"
              alt="me"
              className="float-start"
              height={70}
              width={70}
            />
          </BoxReveal>
          <div>
            <BoxReveal boxColor="black" duration={0.5}>
              <h3 className="text-sm md:text-lg">Hi, nice to meet you!</h3>
            </BoxReveal>
            <BoxReveal boxColor="black" duration={0.5}>
              <h1 className="text-4xl md:text-5xl font-medium flex items-center">
                I&apos;m Mark Louie
              </h1>
            </BoxReveal>
          </div>
        </div>
        <div className="flex space-x-3 items-center">
          <BoxReveal boxColor="black" duration={0.5}>
            <h2 className="text-2xl md:text-4xl font-medium">Software Engineer</h2>
          </BoxReveal>
          <BoxReveal boxColor="black" duration={0.5}>
            <ResumeButton />
          </BoxReveal>
        </div>
      </div>
      <BoxReveal boxColor="black" duration={0.5}>
        <ul className="flex space-x-2 mt-3">
          <li>
            <Link href={"https://github.com/marrrkkk"} target="_blank"><FaGithub className="size-7 md:size-8" /></Link>
          </li>
          <li>
            <Link href={"https://x.com/marrrkkk__"} target="_blank"><FaXTwitter className="size-7 md:size-8" /></Link>
          </li>
          <li>
            <Link href={"https://www.instagram.com/marrrrkkkk__/"} target="_blank"><FaInstagram className="size-7 md:size-8" /></Link>
          </li>
          <li>
            <Link href={"https://www.linkedin.com/in/mark-louie-alvarez-b90162257/"} target="_blank"><FaLinkedin className="size-7 md:size-8" /></Link>
          </li>
        </ul>
      </BoxReveal>
      <ScrollButton />
      <GridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 -z-50"
        )}
      />
    </div>
  );
};

export default Hero;
