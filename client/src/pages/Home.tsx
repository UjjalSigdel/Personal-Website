import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import { useSectionScroll } from "@/lib/navigation";
import { usePageMeta } from "@/lib/seo";

export default function Home() {
  const { sectionRefs, scrollToSection } = useSectionScroll();

  usePageMeta({ path: "/" });

  return (
    <div className="text-gray-800 bg-gray-50">
      <Header onNavigate={scrollToSection} />
      <main id="main-content">
      <div ref={sectionRefs.home}>
        <HeroSection
          onLearnMoreClick={() => scrollToSection("about")}
          onProjectsClick={() => scrollToSection("projects")}
          onContactClick={() => scrollToSection("contact")}
        />
      </div>
      <div ref={sectionRefs.about}>
        <AboutSection />
      </div>
      <div ref={sectionRefs.skills}>
        <SkillsSection />
      </div>
      <div ref={sectionRefs.projects}>
        <ProjectsSection onContactClick={() => scrollToSection("contact")} />
      </div>
      <div ref={sectionRefs.contact}>
        <ContactSection />
      </div>
      </main>
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
