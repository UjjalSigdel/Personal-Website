import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onLearnMoreClick: () => void;
  onProjectsClick: () => void;
  onContactClick: () => void;
}

const BIRTH_DATE = new Date(2006, 5, 23); // June 23, 2006

function getUptime(since: Date): string {
  const now = new Date();
  let years = now.getFullYear() - since.getFullYear();
  let months = now.getMonth() - since.getMonth();
  let days = now.getDate() - since.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years}y ${months}mo ${days}d`;
}

export default function HeroSection({
  onLearnMoreClick,
  onProjectsClick,
  onContactClick,
}: HeroSectionProps) {
  const uptime = getUptime(BIRTH_DATE);

  return (
    <section className="bg-[#0F172A] text-white pt-14 pb-20 md:pt-20 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Byline */}
            <div className="flex items-center gap-4 lg:gap-5 mb-8 lg:mb-10">
              <picture>
                <source srcSet="/profile-photo.webp" type="image/webp" />
                <img
                  src="/profile-photo.png"
                  alt="Ujjal Sigdel"
                  className="w-14 h-14 lg:w-20 lg:h-20 rounded-full object-cover object-[center_15%] border border-[#2b5940] bg-[#0e1f16]"
                />
              </picture>
              <div className="leading-tight">
                <span className="block font-['Inter'] font-semibold text-[#DCEFE3] text-base lg:text-xl">
                  Ujjal Sigdel
                </span>
                <span className="text-sm lg:text-base text-[#7f9d8c]">
                  BEI, Sagarmatha Engineering College
                </span>
              </div>
            </div>

            <h1 className="font-mono font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 text-[#F2F7F4]">
              // still compiling
              <span
                aria-hidden="true"
                className="inline-block w-[0.5em] h-[0.75em] bg-[#4ADE80] ml-2 align-middle animate-blink"
              />
            </h1>

            <p className="text-[#9FB3A8] text-lg leading-relaxed max-w-lg mb-7">
              I'm twenty, in my second year, and most of what's here is still
              in progress. This site is less a highlight reel and more a
              running log of what I'm building, breaking, and figuring out —
              from basic circuits to my first lines of C++.
            </p>

            <p className="font-serif italic text-lg text-[#CBD9D0] border-l-[3px] border-[#2b5940] pl-5 max-w-lg mb-9">
              Turns out engineering is mostly learning in public.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onProjectsClick}
                className="font-mono font-bold text-base px-6 py-3.5 rounded-md bg-[#173626] text-[#6EE7A8] border border-[#2b5940] hover:bg-[#173626]/70 transition-colors"
              >
                $ view --projects
              </button>
              <button
                onClick={onContactClick}
                className="font-mono font-bold text-base px-6 py-3.5 rounded-md text-[#B9C7BE] border border-[#24402f] hover:bg-[#173626]/40 transition-colors"
              >
                $ contact --me
              </button>
            </div>
          </motion.div>

          {/* Status terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full flex flex-col"
          >
            <div className="flex-1 flex flex-col rounded-lg border border-[#1f3a2b] bg-[#0B1710] shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3.5 bg-[#122318] border-b border-[#1f3a2b]">
                <span className="w-3 h-3 rounded-full bg-[#20402e]" />
                <span className="w-3 h-3 rounded-full bg-[#20402e]" />
                <span className="w-3 h-3 rounded-full bg-[#20402e]" />
                <span className="font-mono text-sm text-[#5f8a71] ml-2">
                  ujjal@sagarmatha:~
                </span>
              </div>
              <div className="font-mono text-base leading-[2.15] px-6 py-10 flex-1 flex flex-col justify-center">
                <div className="flex gap-4">
                  <span className="text-[#5f8a71] w-28 flex-shrink-0">whoami</span>
                  <span className="text-[#DCEFE3]">Ujjal Sigdel</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#5f8a71] w-28 flex-shrink-0">role</span>
                  <span className="text-[#DCEFE3]">BEI Student, Year 2</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#5f8a71] w-28 flex-shrink-0">college</span>
                  <span className="text-[#DCEFE3]">Sagarmatha Eng. College (TU)</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#5f8a71] w-28 flex-shrink-0">member</span>
                  <span className="text-[#DCEFE3]">SEIS — Electronic Society</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#5f8a71] w-28 flex-shrink-0">status</span>
                  <span className="text-[#4ADE80] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                    learning
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#5f8a71] w-28 flex-shrink-0">uptime</span>
                  <span className="text-[#DCEFE3]">{uptime}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-[#1f3a2b] bg-[#0B1710] px-6 py-5">
              <div className="font-mono text-sm text-[#5f8a71] mb-2">
                // next up
              </div>
              <p className="text-[#DCEFE3] text-base leading-relaxed">
                Getting the circuit simulation actually working end to end.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 md:mt-20 text-center"
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
