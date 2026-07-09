import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import type { SectionId } from "@/lib/navigation";
import { usePageMeta } from "@/lib/seo";

export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<SectionId, React.RefObject<HTMLDivElement>> = {
    home: homeRef,
    about: aboutRef,
    skills: skillsRef,
    projects: projectsRef,
    contact: contactRef,
  };

  const scrollToSection = (section: SectionId) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  usePageMeta({ path: "/" });

  // Arriving from another page (e.g. /projects) with a #section hash — scroll to it once.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hash in sectionRefs) {
      scrollToSection(hash as SectionId);
    } else {
      // No section hash (e.g. navigating here via client-side routing from
      // another page) — start at the top instead of wherever that page had scrolled to.
      window.scrollTo({ top: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-gray-800 bg-gray-50">
      <Header onNavigate={scrollToSection} />
      <main id="main-content">
      <div ref={homeRef}>
        <HeroSection
          onLearnMoreClick={() => scrollToSection("about")}
          onProjectsClick={() => scrollToSection("projects")}
          onContactClick={() => scrollToSection("contact")}
        />
      </div>
      <div ref={aboutRef}>
        <AboutSection />
      </div>
      <div ref={skillsRef}>
        <SkillsSection />
      </div>
      <div ref={projectsRef}>
        <ProjectsSection onContactClick={() => scrollToSection("contact")} />
      </div>
      <div ref={contactRef}>
        <ContactSection />
      </div>
      </main>
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
