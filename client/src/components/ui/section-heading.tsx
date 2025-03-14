import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl sm:text-4xl font-['Inter'] font-bold text-gray-900">{title}</h2>
      <div className="mt-3 w-24 h-1 bg-[#0D9488] mx-auto rounded-full"></div>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
