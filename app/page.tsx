import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Tech";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

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
