import type { CSSProperties } from "react";
import { Link, useLocation } from "wouter";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

// Faint graph-paper grid used behind any grid of ProjectCards.
export const blueprintFieldStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(74,222,128,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(74,222,128,0.055) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

export const STATUS_META: Record<Project["status"], { label: string; className: string }> = {
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
  detailHref?: string;
  /** Heading level for the title — h3 under a section h2 (homepage), h2 under a page h1 (/projects). */
  titleAs?: "h2" | "h3";
}

export default function ProjectCard({
  index,
  title,
  description,
  category,
  tags,
  status,
  githubUrl,
  detailHref,
  titleAs: TitleTag = "h3",
}: ProjectCardProps) {
  const [, setLocation] = useLocation();
  const statusMeta = STATUS_META[status];
  const figNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      onClick={detailHref ? () => setLocation(detailHref) : undefined}
      className={cn(
        "relative border border-dashed border-[#1f3a2b] rounded bg-[#0B1710]/35 p-6 pt-7 h-full flex flex-col transition-colors duration-200 hover:border-[#4ADE80]/70",
        detailHref && "cursor-pointer",
      )}
    >
      <span className="absolute -top-px -left-px w-2.5 h-2.5 border-t-2 border-l-2 border-[#4ADE80]" />
      <span className="absolute -top-px -right-px w-2.5 h-2.5 border-t-2 border-r-2 border-[#4ADE80]" />
      <span className="absolute -bottom-px -left-px w-2.5 h-2.5 border-b-2 border-l-2 border-[#4ADE80]" />
      <span className="absolute -bottom-px -right-px w-2.5 h-2.5 border-b-2 border-r-2 border-[#4ADE80]" />

      <span
        className={`absolute top-4 right-4 font-mono text-[11px] tracking-wide uppercase px-2 py-0.5 border rounded-sm ${statusMeta.className}`}
      >
        {statusMeta.label}
      </span>

      <span className="font-mono text-xs tracking-wider uppercase text-[#5f8a71] mb-3 pr-24">
        FIG. {figNumber} — {category}
      </span>

      <TitleTag className="text-lg font-semibold text-white mb-3">{title}</TitleTag>
      <p className="text-gray-300 text-sm leading-relaxed mb-5 flex-grow">{description}</p>

      <div className="font-mono text-xs text-[#5f8a71] border-t border-dashed border-[#1f3a2b] pt-3">
        <span className="text-[#DCEFE3]">REF</span>{" "}
        {tags.join(" · ")}
        {githubUrl && (
          <>
            {" · "}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[#5f8a71] hover:text-[#4ADE80] transition-colors"
            >
              github <ExternalLink className="h-3 w-3" />
            </a>
          </>
        )}
        {detailHref && (
          <>
            {" · "}
            <Link
              href={detailHref}
              onClick={(e) => e.stopPropagation()}
              className="text-[#4ADE80] hover:text-[#6EE7A8] transition-colors"
            >
              read more →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
