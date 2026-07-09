import type { CSSProperties } from "react";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";

// Faint graph-paper grid used behind any grid of ProjectCards.
export const blueprintFieldStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(74,222,128,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(74,222,128,0.055) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

const STATUS_META: Record<Project["status"], { label: string; className: string }> = {
  Completed: { label: "completed", className: "text-[#4ADE80] border-[#4ADE80]" },
  "In Progress": { label: "in progress", className: "text-[#eab308] border-[#eab308]" },
  Ongoing: { label: "ongoing", className: "text-[#60a5fa] border-[#60a5fa]" },
};

interface ProjectCardProps {
  index: number;
  title: string;
  description: string;
  category: Project["category"];
  tags: string[];
  status: Project["status"];
  githubUrl?: string;
}

export default function ProjectCard({
  index,
  title,
  description,
  category,
  tags,
  status,
  githubUrl,
}: ProjectCardProps) {
  const statusMeta = STATUS_META[status];
  const figNumber = String(index + 1).padStart(2, "0");

  return (
    <div className="relative border border-dashed border-[#1f3a2b] rounded bg-[#0B1710]/35 p-5 pt-6 h-full flex flex-col transition-colors duration-200 hover:border-[#4ADE80]/70">
      <span className="absolute -top-px -left-px w-2.5 h-2.5 border-t-2 border-l-2 border-[#4ADE80]" />
      <span className="absolute -top-px -right-px w-2.5 h-2.5 border-t-2 border-r-2 border-[#4ADE80]" />
      <span className="absolute -bottom-px -left-px w-2.5 h-2.5 border-b-2 border-l-2 border-[#4ADE80]" />
      <span className="absolute -bottom-px -right-px w-2.5 h-2.5 border-b-2 border-r-2 border-[#4ADE80]" />

      <span
        className={`absolute top-4 right-3.5 font-mono text-[10px] tracking-wide uppercase px-1.5 py-0.5 border rounded-sm ${statusMeta.className}`}
      >
        {statusMeta.label}
      </span>

      <span className="font-mono text-[10.5px] tracking-wider uppercase text-[#5f8a71] mb-2.5 pr-20">
        FIG. {figNumber} — {category}
      </span>

      <h3 className="text-[15.5px] font-semibold text-white mb-2.5">{title}</h3>
      <p className="text-gray-300 text-[13px] leading-relaxed mb-4 flex-grow">{description}</p>

      <div className="font-mono text-[11px] text-[#5f8a71] border-t border-dashed border-[#1f3a2b] pt-2.5">
        <span className="text-[#DCEFE3]">REF</span>{" "}
        {tags.join(" · ")}
        {githubUrl && (
          <>
            {" · "}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#5f8a71] hover:text-[#4ADE80] transition-colors"
            >
              github <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
