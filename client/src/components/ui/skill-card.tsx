import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SkillCardProps {
  name: string;
  icon: ReactNode;
}

export default function SkillCard({ name, icon }: SkillCardProps) {
  return (
    <motion.div 
      className="bg-[#1E293B] p-4 rounded-lg shadow-md border border-gray-800 flex items-center transition-all hover:shadow-lg hover:border-gray-700 min-h-[70px]"
      whileHover={{ scale: 1.03, y: -2 }}
    >
      <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center mr-3 flex-shrink-0 border border-gray-700">
        {icon}
      </div>
      <span className="font-['Inter'] font-medium text-gray-300 text-sm">{name}</span>
    </motion.div>
  );
}
