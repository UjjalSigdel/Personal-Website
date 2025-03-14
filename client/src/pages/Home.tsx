import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-['Roboto'] text-gray-800 bg-gray-50">
      <Header 
        onHomeClick={() => scrollToSection(homeRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onSkillsClick={() => scrollToSection(skillsRef)}
        onProjectsClick={() => scrollToSection(projectsRef)}
        onContactClick={() => scrollToSection(contactRef)}
      />
      <div ref={homeRef}>
        <HeroSection onLearnMoreClick={() => scrollToSection(aboutRef)} />
      </div>
      <div ref={aboutRef}>
        <AboutSection />
      </div>
      <div ref={skillsRef}>
        <SkillsSection />
      </div>
      <div ref={projectsRef}>
        <ProjectsSection onContactClick={() => scrollToSection(contactRef)} />
      </div>
      <div ref={contactRef}>
        <ContactSection />
      </div>
      <Footer 
        onHomeClick={() => scrollToSection(homeRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onSkillsClick={() => scrollToSection(skillsRef)}
        onProjectsClick={() => scrollToSection(projectsRef)}
        onContactClick={() => scrollToSection(contactRef)}
      />
    </div>
  );
}
