import { motion } from "framer-motion";
import { CircuitBoard, Code, ExternalLink, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

const ICONS = {
  "circuit-board": CircuitBoard,
  code: Code,
  globe: Globe,
} as const;

interface ProjectCardProps {
  title: string;
  description: string;
  icon: Project["icon"];
  tags: string[];
  status: string;
  githubUrl?: string;
}

export default function ProjectCard({ title, description, icon, tags, status, githubUrl }: ProjectCardProps) {
  const Icon = ICONS[icon];
  return (
    <motion.div
      className="bg-[#1E293B] rounded-lg overflow-hidden shadow-md border border-gray-800 h-full flex flex-col hover:shadow-lg hover:border-gray-700"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-48 bg-[#0F172A] flex items-center justify-center p-4">
        <Icon className="h-20 w-20 text-[#3B82F6]" />
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-['Inter'] font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 text-sm">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-[#3B82F6]/10 text-[#3B82F6] text-xs border border-[#3B82F6]/20">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="px-6 pb-4 flex items-center justify-between">
        <span className={`text-sm px-2 py-1 rounded-full ${
          status === "Completed"
            ? "bg-[#4ADE80]/10 text-[#4ADE80]"
            : status === "In Progress"
              ? "bg-[#3B82F6]/10 text-[#3B82F6]"
              : "bg-[#A78BFA]/10 text-[#A78BFA]"
        }`}>
          {status}
        </span>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#3B82F6] transition-colors"
          >
            GitHub <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
