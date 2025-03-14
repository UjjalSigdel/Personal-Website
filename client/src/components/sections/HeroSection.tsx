import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, Code, Laptop, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  onLearnMoreClick: () => void;
}

export default function HeroSection({ onLearnMoreClick }: HeroSectionProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Theme detection
  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkTheme(isDark);
    };
    
    checkTheme();
    
    // Listen for theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  return (
    <section className="min-h-screen flex items-center bg-[#0F172A] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hidden on mobile, visible on desktop (left side) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <span className="inline-block text-[#4ADE80] font-medium mb-2">MY JOURNEY IN TECH</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-['Inter'] font-bold leading-tight">
              Ujjal Sigdel <span className="text-[#3B82F6]">Portfolio</span>
            </h1>
            <h2 className="mt-4 text-2xl sm:text-3xl font-['Inter'] font-medium bg-gradient-to-r from-[#3B82F6] to-[#4ADE80] text-transparent bg-clip-text">
              Showcasing My Tech Journey and Skills
            </h2>
            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              At just 18 years old, I am an aspiring Electronics and Information Communication Engineering student at Sagarmatha Engineering College, on a mission to create and innovate through technology.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                onClick={onLearnMoreClick}
                className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-[#0F172A] font-['Inter'] font-medium shadow-lg px-8 py-6"
                size="lg"
              >
                View Services
              </Button>
              <Button 
                variant="outline"
                onClick={onLearnMoreClick}
                className="border-[#3B82F6] text-[#3B82F6] font-['Inter'] font-medium hover:bg-[#3B82F6]/10"
                size="lg"
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
          
          {/* Profile Section - Right side on desktop, above text on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2 relative"
          >
            {/* Main profile */}
            <div className="relative w-full h-[400px] rounded-xl shadow-xl overflow-hidden bg-gradient-to-br from-[#1E293B] to-[#0F172A] dark:from-[#1E293B] dark:to-[#0F172A] light:from-[#F1F5F9] light:to-[#E2E8F0]">
              
              {/* Profile photo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative w-[250px] h-[350px] overflow-hidden flex items-center justify-center">
                  {/* Base photo */}
                  <img 
                    src="/profile-photo.png" 
                    alt="Ujjal Sigdel" 
                    className="object-contain w-full h-full max-w-[250px]"
                  />
                </div>
                
                {/* On small screens only, show name beneath photo */}
                <div className="md:hidden mt-3">
                  <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">Ujjal Sigdel</h3>
                  <p className="text-[#94A3B8] dark:text-[#94A3B8] light:text-gray-600 text-center text-sm">Engineering Student</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 md:mt-24 text-center"
        >
          <button onClick={onLearnMoreClick} className="inline-block text-gray-400 hover:text-[#4ADE80] transition-colors">
            <span className="block mb-2">Explore More</span>
            <ChevronDown className="h-6 w-6 mx-auto animate-bounce" />
          </button>
        </motion.div>
      </div>
      
      {/* Dynamic styling is handled by React state */}
    </section>
  );
}
