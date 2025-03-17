import { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onSkillsClick: () => void;
  onProjectsClick: () => void;
  onContactClick: () => void;
}

export default function Header({
  onHomeClick,
  onAboutClick,
  onSkillsClick,
  onProjectsClick,
  onContactClick
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (callback: () => void) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // Introduce a small delay before executing the callback
    setTimeout(() => {
      callback();
    }, 25); // Adjust the delay as needed
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-gray-800 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-['Inter'] font-bold text-white text-left"
          >
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">U</span>jjal
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent ml-1">S</span>igdel
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => handleNavClick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))} className="font-['Inter'] font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-1 rounded-md transition-colors">Home</button>
            <button onClick={() => handleNavClick(onAboutClick)} className="font-['Inter'] font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-1 rounded-md transition-colors">About</button>
            <button onClick={() => handleNavClick(onSkillsClick)} className="font-['Inter'] font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-1 rounded-md transition-colors">Skills</button>
            <button onClick={() => handleNavClick(onProjectsClick)} className="font-['Inter'] font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-1 rounded-md transition-colors">Projects</button>
            <button onClick={() => handleNavClick(onContactClick)} className="font-['Inter'] font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-1 rounded-md transition-colors">Contact</button>
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

        {/* Mobile Navigation */}
        <div className={`md:hidden pb-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <button onClick={() => handleNavClick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))} className="block py-2 px-4 font-['Inter'] font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded w-full text-left">Home</button>
          <button onClick={() => handleNavClick(onAboutClick)} className="block py-2 px-4 font-['Inter'] font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded w-full text-left">About</button>
          <button onClick={() => handleNavClick(onSkillsClick)} className="block py-2 px-4 font-['Inter'] font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded w-full text-left">Skills</button>
          <button onClick={() => handleNavClick(onProjectsClick)} className="block py-2 px-4 font-['Inter'] font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded w-full text-left">Projects</button>
          <button onClick={() => handleNavClick(onContactClick)} className="block py-2 px-4 font-['Inter'] font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded w-full text-left">Contact</button>
        </div>
      </div>
    </header>
  );
}