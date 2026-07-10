import { useEffect, useRef, type RefObject } from "react";
import { useLocation } from "wouter";

// The homepage's scroll-to sections, shared by Header and Footer nav.
// Per VISION.md's Navigation section these are always same-page scroll
// targets — secondary pages like /projects and /blog are never nav items.

export type SectionId = "home" | "about" | "skills" | "projects" | "contact";

export const NAV_ITEMS: Array<{ id: SectionId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// Navigate from a secondary page back to a homepage section: route to `/`
// with a `#section` hash that useSectionScroll (below) picks up on mount.
export function useHomeSectionNavigate() {
  const [, setLocation] = useLocation();
  return (section: SectionId) =>
    setLocation(section === "home" ? "/" : `/#${section}`);
}

// The consuming half of that `#section` protocol, used by the homepage:
// one ref per section, smooth scrolling between them, and a mount effect
// that honors an arrival hash — or starts at the top, since client-side
// routing otherwise preserves the previous page's scroll position.
// Kept beside useHomeSectionNavigate so the producer and consumer of the
// hash format can never drift apart.
export function useSectionScroll(): {
  sectionRefs: Record<SectionId, RefObject<HTMLDivElement>>;
  scrollToSection: (section: SectionId) => void;
} {
  const sectionRefs: Record<SectionId, RefObject<HTMLDivElement>> = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: SectionId) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hash in sectionRefs) {
      scrollToSection(hash as SectionId);
    } else {
      window.scrollTo({ top: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sectionRefs, scrollToSection };
}
