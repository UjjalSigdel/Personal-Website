import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, type SectionId } from "@/lib/navigation";

interface HeaderProps {
  onNavigate: (section: SectionId) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 font-mono font-bold text-xl text-[#E7ECF5] text-left"
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
                className="group flex items-center gap-1 font-medium text-gray-300 hover:text-white transition-colors"
              >
                <span className="font-mono text-[#4ADE80] text-sm opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-[55] bg-black/60 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`md:hidden fixed top-0 right-0 z-[60] h-full w-72 max-w-[80vw] bg-[#0F172A] border-l border-[#1f4a34] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col px-4 pt-24 gap-1">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="group flex items-center gap-2 py-3 px-2 font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded w-full text-left"
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
