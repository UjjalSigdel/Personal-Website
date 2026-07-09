import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, type SectionId } from "@/lib/navigation";

interface HeaderProps {
  onNavigate: (section: SectionId) => void;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]";

export default function Header({ onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstNavItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Deliberately NOT a JS focus trap (Tab interception is where drawer a11y
  // usually breaks): the drawer is aria-modal (screen readers self-contain),
  // Esc closes it, focus moves in on open / back to the toggle on close, and
  // the closed drawer leaves the tab order via the visibility transition below.
  useEffect(() => {
    if (isMenuOpen) {
      firstNavItemRef.current?.focus();
    }
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    toggleRef.current?.focus();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section: SectionId) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // Small delay so the drawer-close animation starts before any navigation.
    setTimeout(() => {
      onNavigate(section);
    }, 25);
  };

  return (
    <>
    <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-[#1f4a34] backdrop-blur-sm">
      <a
        href="#main-content"
        className={`sr-only focus:not-sr-only focus:absolute focus:top-2.5 focus:left-3 focus:z-[70] font-mono text-sm px-3 py-2 rounded-md bg-[#173626] text-[#6EE7A8] border border-[#2b5940] ${focusRing}`}
      >
        $ skip --to-content
      </a>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={() => onNavigate("home")}
            className={`flex items-center gap-2 font-mono font-bold text-xl text-[#E7ECF5] text-left rounded ${focusRing}`}
          >
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] shadow-[0_0_0_3px_rgba(74,222,128,0.2)]" />
            ~/ujjal
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`group flex items-center gap-1 font-medium text-gray-300 hover:text-white transition-colors rounded ${focusRing}`}
              >
                <span className="font-mono text-[#4ADE80] text-sm opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            ref={toggleRef}
            onClick={toggleMenu}
            className={`md:hidden text-gray-300 rounded ${focusRing}`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile off-canvas drawer — kept outside <header> because its
          backdrop-blur creates a containing block for fixed descendants,
          which would confine these to the header's own bounding box. */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-[55] bg-black/60 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onKeyDown={(e) => {
          if (e.key === "Escape") closeMenu();
        }}
        className={`md:hidden fixed top-0 right-0 z-[60] h-full w-72 max-w-[80vw] bg-[#0F172A] border-l border-[#1f4a34] shadow-2xl ${
          isMenuOpen
            ? "translate-x-0 visible [transition:transform_300ms_ease-in-out]"
            : // visibility flips only after the slide-out finishes, removing the
              // closed drawer from the tab order without cutting the animation.
              "translate-x-full invisible [transition:transform_300ms_ease-in-out,visibility_0s_300ms]"
        }`}
      >
        <nav className="flex flex-col px-4 pt-24 gap-1">
          {NAV_ITEMS.map(({ id, label }, index) => (
            <button
              key={id}
              ref={index === 0 ? firstNavItemRef : undefined}
              onClick={() => handleNavClick(id)}
              className={`group flex items-center gap-2 py-3 px-2 font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded w-full text-left ${focusRing}`}
            >
              <span className="font-mono text-[#4ADE80] text-sm opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
