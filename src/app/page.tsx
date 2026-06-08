import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";

const Experience = dynamic(() => import("@/components/sections/Experience"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

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
