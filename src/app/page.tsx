import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Floating Translucent Navbar */}
      <Navbar />

      <main className="flex flex-col min-h-screen">
        {/* Hero Section with Floating Antigravity elements */}
        <Hero />

        {/* Technical Skills Section */}
        <Skills />

        {/* Work Experience Timeline Section */}
        <Experience />

        {/* Highlighted Projects Section (PandyTalk, Earthy-Commerce) */}
        <Projects />

        {/* Contact Form & Social Links Section */}
        <Contact />
      </main>
    </>
  );
}
