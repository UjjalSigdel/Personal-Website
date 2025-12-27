import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  onLearnMoreClick: () => void;
  onContactClick: () => void;
}

export default function HeroSection({
  onLearnMoreClick,
  onContactClick,
}: HeroSectionProps) {
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
    <section className="min-h-[95vh] flex items-center bg-[#0F172A] text-white relative overflow-hidden">
      {/* Animated gradient circles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#3B82F6]/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#4ADE80]/10 rounded-full filter blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hidden on mobile, visible on desktop (left side) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-1"
          >
            <span className="inline-block text-[#4ADE80] font-medium mb-2">
              MY JOURNEY IN TECH
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-['Inter'] font-bold leading-tight">
              Ujjal Sigdel <span className="text-[#3B82F6]">Portfolio</span>
            </h1>
            <motion.h2
              className="mt-4 text-2xl sm:text-3xl font-['Inter'] font-medium bg-gradient-to-r from-[#3B82F6] to-[#4ADE80] text-transparent bg-clip-text mb-6 md:mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Showcasing My Tech Journey and Skills
            </motion.h2>

            {/* Profile Section - Right side on desktop, after showcase text on mobile */}
            <div className="md:hidden block mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mt-6 md:mt-0"
              >
                <div className="relative w-full max-w-[550px] mx-auto aspect-[4/5] rounded-xl shadow-xl overflow-hidden bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                      <picture>
                        <source
                          srcSet="/profile-photo.webp"
                          type="image/webp"
                        />
                        <img
                          src="/profile-photo.png"
                          alt="Ujjal Sigdel"
                          className="object-cover w-full h-full"
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <p className="text-lg text-gray-300 max-w-xl mb-6">
              At 19 years old, I am an aspiring Electronics and Information
              Communication Engineering student at Sagarmatha Engineering
              College, on a mission to create and innovate through technology.
            </p>

            {/* Current Focus */}
            <motion.div
              className="mb-6 p-4 rounded-lg bg-[#1E293B]/50 border border-[#3B82F6]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-[#A78BFA] font-semibold mb-2">
                Current Focus
              </h3>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 text-xs rounded-full bg-[#3B82F6]/10 text-[#3B82F6]">
                  Web Development
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-[#4ADE80]/10 text-[#4ADE80]">
                  Electronics
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-[#A78BFA]/10 text-[#A78BFA]">
                  Programming
                </span>
              </div>
            </motion.div>

            {/* Key Focus Areas */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div
                className="p-4 rounded-lg bg-[#1E293B]/50 border border-[#3B82F6]/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-[#4ADE80] font-semibold mb-2">Learning</h3>
                <p className="text-sm text-gray-400">
                  Electronics & Programming fundamentals
                </p>
              </motion.div>
              <motion.div
                className="p-4 rounded-lg bg-[#1E293B]/50 border border-[#3B82F6]/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-[#3B82F6] font-semibold mb-2">Building</h3>
                <p className="text-sm text-gray-400">
                  Web & Electronics projects
                </p>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={onLearnMoreClick}
                className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-[#0F172A] font-['Inter'] font-medium shadow-lg px-8 py-6"
                size="lg"
              >
                View Services
              </Button>
              <Button
                variant="outline"
                onClick={onContactClick}
                className="border-[#3B82F6] text-[#3B82F6] font-['Inter'] font-medium hover:bg-[#3B82F6]/10 bg-[#1E293B]/50"
                size="lg"
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>

          {/* Profile Section - Right side on desktop only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block order-2 relative mt-6 md:mt-0"
          >
            {/* Profile container */}
            <div className="relative w-full max-w-[400px] mx-auto aspect-[3/4] rounded-xl shadow-xl overflow-hidden bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
              {/* Floating icons */}
              <div className="absolute w-12 h-12 left-4 top-8 bg-[#1E293B]/80 rounded-full flex items-center justify-center animate-float-slow">
                <span className="text-[#4ADE80] text-2xl">&lt;/&gt;</span>
              </div>
              <div className="absolute w-10 h-10 right-8 top-16 bg-[#1E293B]/80 rounded-full flex items-center justify-center animate-float-medium">
                <span className="text-[#3B82F6] text-xl">⚡</span>
              </div>
              <div className="absolute w-8 h-8 left-12 bottom-20 bg-[#1E293B]/80 rounded-full flex items-center justify-center animate-float-fast">
                <span className="text-[#A78BFA] text-lg">⚙️</span>
              </div>
              {/* Profile photo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/profile-photo.png"
                    alt="Ujjal Sigdel"
                    className="object-cover w-full h-full"
                  />
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
          <button
            onClick={onLearnMoreClick}
            className="inline-block text-gray-400 hover:text-[#4ADE80] transition-colors"
          >
            <span className="block mb-2">Explore More</span>
            <ChevronDown className="h-6 w-6 mx-auto animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
