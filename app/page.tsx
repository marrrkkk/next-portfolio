import Hero from "@/components/Hero";
import About from "@/components/About";
import Nav from "@/components/Nav";
import dynamic from "next/dynamic";

const Skills = dynamic(() => import("@/components/Tech"), {
  loading: () => <div className="mt-40 xl:w-[45%] md:w-[70%] w-[80%] h-64" />,
});
const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => <div className="mt-20 xl:w-[45%] md:w-[70%] w-[80%] h-64" />,
});
const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="mt-20 xl:w-[45%] md:w-[70%] w-[80%] h-64" />,
});
const Footer = dynamic(() => import("@/components/Footer"));

const Home = () => {
  return (
    <main className="flex flex-col justify-center items-center">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Footer />
    </main>
  );
};

export default Home;
