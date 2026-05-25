import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

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
