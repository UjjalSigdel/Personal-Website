import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={sectionRef} className="py-20 bg-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* How I got here */}
          <motion.div variants={itemVariants}>
            <span className="inline-block text-[#4ADE80] font-medium mb-2">MY SKILL SET</span>
            <h2 className="text-4xl font-['Inter'] font-bold text-white mb-8">What I can actually do</h2>

            <h3 className="text-2xl font-['Inter'] font-semibold text-white mb-6">
              How I got here
            </h3>
            <div className="space-y-1">
              <div className="flex gap-4 py-4 border-t border-gray-800">
                <span className="font-mono text-[#4ADE80] text-sm w-24 flex-shrink-0">started</span>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Basic electronics and C, through coursework and SEIS.
                </p>
              </div>
              <div className="flex gap-4 py-4 border-t border-gray-800">
                <span className="font-mono text-[#4ADE80] text-sm w-24 flex-shrink-0">picked up</span>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Web basics — HTML and CSS — mostly by building this site.
                </p>
              </div>
              <div className="flex gap-4 py-4 border-t border-gray-800">
                <span className="font-mono text-[#4ADE80] text-sm w-24 flex-shrink-0">currently</span>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Getting comfortable with computer networks and finishing more complete web projects.
                </p>
              </div>
              <div className="flex gap-4 py-4 border-t border-b border-gray-800">
                <span className="font-mono text-[#4ADE80] text-sm w-24 flex-shrink-0">next</span>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Tie the electronics side back in — something that mixes circuits with code.
                </p>
              </div>
            </div>
          </motion.div>

          {/* skills.yaml */}
          <motion.div variants={itemVariants}>
            <div className="rounded-lg border border-[#1f3a2b] bg-[#0B1710] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#122318] border-b border-[#1f3a2b]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#20402e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#20402e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#20402e]" />
                <span className="font-mono text-sm text-[#5f8a71] ml-2">~/skills.yaml</span>
              </div>

              <div className="p-6 font-mono text-sm leading-loose whitespace-pre">
                <div><span className="text-[#4ADE80]">electronics:</span></div>
                <div><span className="text-[#5f8a71]">  -</span> <span className="text-[#DCEFE3]">circuit design</span></div>
                <div><span className="text-[#5f8a71]">  -</span> <span className="text-[#DCEFE3]">microcontrollers</span></div>

                <div className="mt-2"><span className="text-[#4ADE80]">programming:</span></div>
                <div><span className="text-[#5f8a71]">  -</span> <span className="text-[#DCEFE3]">C / C++</span></div>
                <div><span className="text-[#5f8a71]">  -</span> <span className="text-[#DCEFE3]">HTML / CSS</span></div>

                <div className="mt-2"><span className="text-[#4ADE80]">still_learning:</span></div>
                <div><span className="text-[#5f8a71]">  -</span> <span className="text-[#DCEFE3]">web development</span></div>
                <div><span className="text-[#5f8a71]">  -</span> <span className="text-[#DCEFE3]">computer networks</span></div>

                <div className="mt-2"><span className="text-[#4ADE80]">strengths:</span></div>
                <div><span className="text-[#5f8a71]">  -</span> <span className="text-[#DCEFE3]">problem solving</span></div>
                <div><span className="text-[#5f8a71]">  -</span> <span className="text-[#DCEFE3]">communication</span></div>
                <div><span className="text-[#5f8a71]">  -</span> <span className="text-[#DCEFE3]">adaptability</span></div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
