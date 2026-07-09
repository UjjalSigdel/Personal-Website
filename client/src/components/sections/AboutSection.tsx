import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { useRef } from "react";
import { terminalButton } from "@/components/ui/terminal-button";
import { staggerContainer, fadeUpItem } from "@/lib/motion";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 bg-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-block text-[#4ADE80] font-medium mb-2">
            MY JOURNEY IN TECH
          </span>
          <h2 className="text-4xl font-bold text-white">
            Still figuring things out
          </h2>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer()}
        >
          <motion.div variants={fadeUpItem(0.6)}>
            <h3 className="text-2xl font-semibold text-[#4ADE80] mb-4">
              Who am I?
            </h3>
            <p className="text-gray-300 mb-6 max-w-xl">
              A second-year engineering student who likes building things more
              than talking about them. This site is where that shows up —
              part portfolio, part running notebook of what I'm still
              figuring out.
            </p>

            <h3 className="text-2xl sm:text-2xl font-semibold text-white mt-10 mb-2">
              A few things about me
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              A few things that are true about how I work, if not yet about
              what I've built.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex gap-3 py-3 border-t border-gray-800">
                <span className="font-mono text-[#4ADE80] text-sm flex-shrink-0">01</span>
                <p className="text-gray-300 text-sm leading-relaxed">
                  I'd rather understand why something works than just get it working.
                </p>
              </div>
              <div className="flex gap-3 py-3 border-t border-gray-800">
                <span className="font-mono text-[#4ADE80] text-sm flex-shrink-0">02</span>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Circuits and code scratch the same itch — building something
                  that does what you told it to.
                </p>
              </div>
            </div>

            <a
              href="/MyCV.pdf"
              download="Ujjal_Sigdel_CV.pdf"
              className={terminalButton({ size: "md" })}
            >
              $ download --resume
            </a>
          </motion.div>

          <motion.div variants={fadeUpItem(0.6)}>
            <div className="rounded-lg border border-[#1f3a2b] bg-[#0B1710] p-6">
              <div className="font-mono text-xs text-[#5f8a71] mb-3">
                // the blog
              </div>
              <span className="inline-block w-fit font-mono text-[11px] text-[#F59E0B] border border-[#F59E0B]/30 bg-[#F59E0B]/10 rounded-full px-2 py-1 mb-4">
                under construction
              </span>
              <h4 className="text-lg font-semibold text-white mb-2">
                Know more about me
              </h4>
              <p className="text-gray-400 text-sm mb-6">
                Notes on what I'm learning and building — not live yet, but
                the page exists and it's coming.
              </p>
              <Link
                href="/blog"
                className={terminalButton({ tone: "outline" })}
              >
                $ visit /blog
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
