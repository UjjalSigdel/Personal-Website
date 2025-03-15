import { motion } from "framer-motion";
import {
  Download,
  Cpu,
  Lightbulb,
  GraduationCap,
  Code,
  Server,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
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
        <div className="mb-12">
          <span className="inline-block text-[#4ADE80] font-medium mb-2">
            MY JOURNEY IN TECH
          </span>
          <h2 className="text-4xl font-['Inter'] font-bold text-white mb-4">
            Unleashing potential through learning
          </h2>
          <div className="h-1 w-20 bg-[#3B82F6]"></div>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <h3 className="text-2xl font-['Inter'] font-semibold text-[#3B82F6] mb-4">
              Who am I?
            </h3>
            <div className="text-gray-300 mb-6 max-w-2xl">
              <p className="mb-4">
                At just 18 years old, I am an aspiring Electronics and
                Information Communication Engineering student at Sagarmatha
                Engineering College, affiliated with TU. My involvement with
                SEIS (Electronic Society) has fueled my passion for technology.
              </p>
              <p>
                With skills in C, HTML, and CSS, I am on a mission to create a
                personal portfolio that showcases my work, skills, and
                achievements.
              </p>
            </div>
            <div className="text-gray-300 mb-6 max-w-2xl">
              <p>
                This website reflects my learning journey and my potential to
                contribute to the tech world. Although I'm just starting my
                academic journey, I'm eager to build a strong foundation in
                engineering principles and develop practical skills that will
                prepare me for future challenges in the tech industry.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-8">
              <Card className="bg-[#1E293B] p-4 border-none shadow-lg h-full">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-[#3B82F6]/10 mr-3 flex-shrink-0">
                    <GraduationCap className="h-5 w-5 text-[#3B82F6]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-['Inter'] font-semibold text-white mb-1">
                      Education
                    </h4>
                    <p className="text-gray-400 text-sm whitespace-normal">
                      Sagarmatha Engineering College (TU), Electronic and ICT
                      Engineering
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="bg-[#1E293B] p-4 border-none shadow-lg h-full">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-[#4ADE80]/10 mr-3 flex-shrink-0">
                    <Lightbulb className="h-5 w-5 text-[#4ADE80]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-['Inter'] font-semibold text-white mb-1">
                      Interests
                    </h4>
                    <p className="text-gray-400 text-sm whitespace-normal">
                      Circuit Design, Programming, IoT, Telecommunications
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-8">
              <a
                href="/MyCV.pdf"
                download="Ujjal_Sigdel_CV.pdf"
                className="inline-flex items-center px-6 py-3 bg-[#1E293B] border border-[#3B82F6] text-[#3B82F6] font-['Inter'] font-medium rounded-lg hover:bg-[#3B82F6]/10 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Download CV
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 md:order-2">
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 bg-[#1E293B] rounded-xl overflow-hidden shadow-xl">
                <div className="p-8 flex flex-col items-center justify-center">
                  <h3 className="text-2xl font-['Inter'] font-semibold text-white mb-6">
                    Technical Focus Areas
                  </h3>
                  <div className="grid grid-cols-2 gap-8 w-full">
                    <div className="flex flex-col items-center p-6 bg-[#0F172A] rounded-lg">
                      <Cpu className="h-12 w-12 text-[#3B82F6] mb-4" />
                      <span className="text-gray-300 text-center text-sm">
                        Electronics & Circuit Design
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-[#0F172A] rounded-lg">
                      <Code className="h-10 w-10 text-[#4ADE80] mb-3" />
                      <span className="text-gray-300 text-center text-sm">
                        Web Development
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-[#0F172A] rounded-lg">
                      <Server className="h-10 w-10 text-[#A78BFA] mb-3" />
                      <span className="text-gray-300 text-center text-sm">
                        IoT Solutions
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-[#0F172A] rounded-lg">
                      <Lightbulb className="h-10 w-10 text-[#F59E0B] mb-3" />
                      <span className="text-gray-300 text-center text-sm">
                        Creative Problem Solving
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
