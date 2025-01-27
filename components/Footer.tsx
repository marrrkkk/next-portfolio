import Link from "next/link";
import { RainbowButton } from "./ui/rainbow-button";

const Footer = () => {
  const currentYear = new Date().getFullYear(); 
  return (
    <footer className="w-full">
      <div className="my-40 text-center">
        <p className="text-zinc-500">Need a Developer?</p>
        <h1 className="font-bold text-4xl mb-5">Let&apos;s Work Together</h1>
        <RainbowButton>
          <Link href="mailto:marklouie.dev@gmail.com">Hire Me</Link>
        </RainbowButton>
      </div>
      <div className="ml-10 mb-5 text-zinc-500 text-sm">
        <p>© {currentYear} Mark Louie Alvarez</p>
      </div>
    </footer>
  );
};

export default Footer;
