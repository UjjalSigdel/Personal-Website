import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import ProgressBar from "@/components/ui/progress-bar";
import SkillCard from "@/components/ui/skill-card";
import { Cpu, Book, Users, MessageSquare, Zap, Shield, Smartphone, Globe, CircuitBoard, BrainCircuit } from "lucide-react";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const technicalSkills = [
    { name: "Basic Electronics", percentage: 75 },
    { name: "Programming (C/C++)", percentage: 60 },
    { name: "Mathematics", percentage: 70 },
    { name: "Web Development", percentage: 45 },
    { name: "Computer Networks", percentage: 50 }
  ];

  const softSkills = [
    { name: "Problem Solving", icon: <BrainCircuit className="h-5 w-5 text-[#3B82F6]" /> },
    { name: "Fast Learning", icon: <Book className="h-5 w-5 text-[#4ADE80]" /> },
    { name: "Teamwork", icon: <Users className="h-5 w-5 text-[#A78BFA]" /> },
    { name: "Communication", icon: <MessageSquare className="h-5 w-5 text-[#3B82F6]" /> },
    { name: "Adaptability", icon: <Zap className="h-5 w-5 text-[#4ADE80]" /> },
    { name: "Determination", icon: <Shield className="h-5 w-5 text-[#A78BFA]" /> }
  ];

  const toolsAndTech = [
    { name: "Programming", icon: "C++", color: "#3B82F6" },
    { name: "Microcontrollers", icon: <Cpu className="h-10 w-10 text-[#4ADE80]" /> },
    { name: "Mobile Tech", icon: <Smartphone className="h-10 w-10 text-[#A78BFA]" /> },
    { name: "Networks", icon: <Globe className="h-10 w-10 text-[#3B82F6]" /> },
    { name: "Web Basics", icon: "HTML", color: "#4ADE80" },
    { name: "Circuit Design", icon: <CircuitBoard className="h-10 w-10 text-[#A78BFA]" /> }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block text-[#4ADE80] font-medium mb-2">MY SKILL SET</span>
          <h2 className="text-4xl font-['Inter'] font-bold text-white mb-4">Harnessing technology for innovation</h2>
          <div className="h-1 w-20 bg-[#3B82F6]"></div>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Technical Skills */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-['Inter'] font-semibold text-[#3B82F6] mb-6">Technical Skills</h3>
            
            {technicalSkills.map((skill, index) => (
              <motion.div 
                key={index} 
                className="mb-5"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-['Inter'] font-medium text-white">{skill.name}</h4>
                  <span className="text-sm font-medium text-gray-400">{skill.percentage}%</span>
                </div>
                <ProgressBar percentage={skill.percentage} />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Soft Skills */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-['Inter'] font-semibold text-[#4ADE80] mb-6">Soft Skills</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {softSkills.map((skill, index) => (
                <SkillCard key={index} name={skill.name} icon={skill.icon} />
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Tools & Technologies */}
        <motion.div 
          className="mt-16"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-['Inter'] font-semibold text-[#A78BFA] mb-6 text-center">Tools & Technologies</h3>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {toolsAndTech.map((tool, index) => (
              <motion.div 
                key={index}
                className="bg-[#1E293B] p-5 rounded-lg shadow-xl w-36 h-36 flex flex-col items-center justify-center border border-gray-800 hover:border-gray-700 hover:shadow-2xl"
                whileHover={{ scale: 1.05, y: -5 }}
                variants={itemVariants}
              >
                <div className="w-14 h-14 flex items-center justify-center mb-3">
                  {typeof tool.icon === 'string' ? (
                    <span className="font-mono text-xl" style={{ color: tool.color }}>{tool.icon}</span>
                  ) : (
                    tool.icon
                  )}
                </div>
                <span className="font-['Inter'] text-sm text-center text-gray-300">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
