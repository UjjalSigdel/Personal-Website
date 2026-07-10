import type { CSSProperties } from "react";
import { Link, useLocation } from "wouter";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

// Faint graph-paper grid used behind any grid of ProjectCards.
// Accent-tinted via the theme token so a retheme carries the grid with it.
export const blueprintFieldStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, hsl(var(--accent) / 0.055) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--accent) / 0.055) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

export const STATUS_META: Record<Project["status"], { label: string; className: string }> = {
  Completed: { label: "completed", className: "text-success border-success" },
  "In Progress": { label: "in progress", className: "text-warning border-warning" },
  // "Ongoing" blue has no contract token yet (an info-style status) — the one
  // deliberate hex holdout here; promote to a token if a second consumer appears.
  Ongoing: { label: "ongoing", className: "text-[#60a5fa] border-[#60a5fa]" },
};

// The bracket-style status stamp, shared by the project card and the project
// detail header — one definition so the two renderings can't drift apart.
export function StatusStamp({
  status,
  className,
}: {
  status: Project["status"];
  className?: string;
}) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "font-mono text-[11px] tracking-wide uppercase px-2 py-0.5 border rounded-sm",
        meta.className,
        className,
      )}
    >
      {meta.label}
    </span>
  );
}

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
  const figNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      onClick={detailHref ? () => setLocation(detailHref) : undefined}
      className={cn(
        "relative border border-dashed border-border rounded bg-surface/35 p-6 pt-7 h-full flex flex-col transition-colors duration-200 hover:border-accent/70",
        detailHref && "cursor-pointer",
      )}
    >
      <span className="absolute -top-px -left-px w-2.5 h-2.5 border-t-2 border-l-2 border-accent" />
      <span className="absolute -top-px -right-px w-2.5 h-2.5 border-t-2 border-r-2 border-accent" />
      <span className="absolute -bottom-px -left-px w-2.5 h-2.5 border-b-2 border-l-2 border-accent" />
      <span className="absolute -bottom-px -right-px w-2.5 h-2.5 border-b-2 border-r-2 border-accent" />

      <StatusStamp status={status} className="absolute top-4 right-4" />

      <span className="font-mono text-xs tracking-wider uppercase text-faint mb-3 pr-24">
        FIG. {figNumber} — {category}
      </span>

      <TitleTag className="text-lg font-semibold text-white mb-3">{title}</TitleTag>
      <p className="text-gray-300 text-sm leading-relaxed mb-5 flex-grow">{description}</p>

      <div className="font-mono text-xs text-faint border-t border-dashed border-border pt-3">
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
              className="inline-flex items-center gap-1 text-faint hover:text-accent transition-colors"
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
              className="text-accent hover:text-accent-strong transition-colors"
            >
              read more →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
