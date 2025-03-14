import { motion } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  // Create a gradient based on the percentage
  const getBarColor = () => {
    if (percentage >= 70) return "bg-gradient-to-r from-[#3B82F6] to-[#4ADE80]";
    if (percentage >= 50) return "bg-gradient-to-r from-[#3B82F6] to-[#A78BFA]";
    return "bg-gradient-to-r from-[#3B82F6] to-[#3B82F6]";
  };

  return (
    <div className="h-2.5 bg-[#0F172A] rounded-full overflow-hidden border border-gray-800">
      <motion.div
        className={`h-full ${getBarColor()} rounded-full`}
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}
