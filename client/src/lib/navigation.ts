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
// with a `#section` hash that Home.tsx scrolls to on mount.
export function useHomeSectionNavigate() {
  const [, setLocation] = useLocation();
  return (section: SectionId) =>
    setLocation(section === "home" ? "/" : `/#${section}`);
}
