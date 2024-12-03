import { RainbowButton } from "./ui/rainbow-button";

const Footer = () => {
  return(
    <footer className="w-full">
      <div className="my-40 text-center">
        <p className="text-zinc-500">Need a Developer?</p>
        <h1 className="font-bold text-4xl mb-5">Let&apos;s Work Together</h1>
        <RainbowButton>Hire Me</RainbowButton>
      </div>
      <div className="ml-10 mb-5 text-zinc-500 text-sm">
        <p>© 2024 Mark Louie Alvarez</p>
      </div>
    </footer>
  )
}

export default Footer;