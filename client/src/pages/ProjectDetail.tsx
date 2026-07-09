import { Redirect, useParams } from "wouter";
import { ExternalLink } from "lucide-react";
import SubPageLayout from "@/components/SubPageLayout";
import TerminalWindow from "@/components/ui/terminal-window";
import { STATUS_META } from "@/components/ui/project-card";
import { terminalButton } from "@/components/ui/terminal-button";
import { projects } from "@/lib/projects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = index === -1 ? undefined : projects[index];

  // No such project, or one without detail content — back to the archive.
  if (!project?.overview) {
    return <Redirect to="/projects" />;
  }

  const statusMeta = STATUS_META[project.status];
  const figNumber = String(index + 1).padStart(2, "0");

  return (
    <SubPageLayout
      backTo="/projects"
      title={`${project.title} — Ujjal Sigdel`}
      description={project.description}
    >
      {/* Header */}
      <div className="border-b border-dashed border-[#1f3a2b] pb-7 mb-8">
        <span className="block font-mono text-xs tracking-wider uppercase text-[#5f8a71] mb-2">
          FIG. {figNumber} — {project.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{project.title}</h1>
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={`font-mono text-[11px] tracking-wide uppercase px-2 py-0.5 border rounded-sm ${statusMeta.className}`}
          >
            {statusMeta.label}
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] text-[#5f8a71] border border-[#1f3a2b] rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[1.6fr_0.9fr] gap-10 items-start">
        {/* Prose column */}
        <div>
          <h2 className="font-mono text-xs tracking-wider uppercase text-[#4ADE80] mb-3">
            // overview
          </h2>
          <p className="text-gray-300 text-[15px] leading-relaxed max-w-2xl">
            {project.overview}
          </p>

          {project.notebook && project.notebook.length > 0 && (
            <>
              <h2 className="font-mono text-xs tracking-wider uppercase text-[#4ADE80] mt-9 mb-4">
                // lab notebook
              </h2>
              <div className="border-l border-dashed border-[#1f3a2b] pl-5 space-y-4">
                {project.notebook.map(({ date, entry }) => (
                  <div key={date + entry} className="relative">
                    <span
                      className={`absolute -left-[24px] top-1.5 w-[7px] h-[7px] rounded-full ${
                        date === "now" ? "bg-[#4ADE80]" : "bg-[#5f8a71]"
                      }`}
                    />
                    <span className="block font-mono text-[11px] text-[#5f8a71] mb-0.5">
                      {date}
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed">{entry}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <>
              <h2 className="font-mono text-xs tracking-wider uppercase text-[#4ADE80] mt-9 mb-4">
                // screenshots
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.screenshots.map(({ src, caption }) => (
                  <figure key={src} className="m-0">
                    <img
                      src={src}
                      alt={caption}
                      className="w-full rounded-md border border-[#1f3a2b]"
                      loading="lazy"
                    />
                    <figcaption className="font-mono text-[11px] text-[#5f8a71] mt-1.5">
                      {caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Spec panel */}
        <div className="md:sticky md:top-24">
          <TerminalWindow title="project.yaml">
            <div className="p-5 font-mono text-[13px] leading-loose">
              <div>
                <span className="text-[#4ADE80]">status:</span>{" "}
                <span className="text-[#DCEFE3]">
                  {statusMeta.label.replace(" ", "_")}
                </span>
              </div>
              <div>
                <span className="text-[#4ADE80]">category:</span>{" "}
                <span className="text-[#DCEFE3]">{project.category.toLowerCase()}</span>
              </div>
              {project.tools && (
                <>
                  <div>
                    <span className="text-[#4ADE80]">tools:</span>
                  </div>
                  {project.tools.map((tool) => (
                    <div key={tool}>
                      <span className="text-[#5f8a71]">{"  "}-</span>{" "}
                      <span className="text-[#DCEFE3]">{tool}</span>
                    </div>
                  ))}
                </>
              )}
              {project.started && (
                <div>
                  <span className="text-[#4ADE80]">started:</span>{" "}
                  <span className="text-[#DCEFE3]">{project.started}</span>
                </div>
              )}
            </div>
          </TerminalWindow>

          {(project.githubUrl || project.liveUrl) && (
            <div className="flex flex-col gap-2.5 mt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${terminalButton({ tone: "solid" })} justify-center gap-1.5`}
                >
                  $ git clone — repository <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${terminalButton({ tone: "outline" })} justify-center gap-1.5`}
                >
                  $ open --live-demo <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </SubPageLayout>
  );
}
