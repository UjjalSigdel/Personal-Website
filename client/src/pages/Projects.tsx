import { useState } from "react";
import { m } from "framer-motion";
import SubPageLayout from "@/components/SubPageLayout";
import ProjectCard, { blueprintFieldStyle } from "@/components/ui/project-card";
import { staggerContainer, fadeUpItem } from "@/lib/motion";
import { projects, type Project } from "@/lib/projects";
import { SITE } from "@/lib/site.config";

const CATEGORIES: Array<Project["category"] | "All"> = [
  "All",
  "Electronics",
  "Programming",
  "Web Development",
];

export default function Projects() {
  // Real DIP-switch semantics: each category switch toggles independently
  // (several can be on at once — the filter is their union). No categories
  // on means "All" is on; turning the last category off falls back to All.
  const [activeCategories, setActiveCategories] = useState<Set<Project["category"]>>(
    new Set(),
  );

  const toggleCategory = (category: Project["category"] | "All") => {
    if (category === "All") {
      setActiveCategories(new Set());
      return;
    }
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const isOn = (category: Project["category"] | "All") =>
    category === "All" ? activeCategories.size === 0 : activeCategories.has(category);

  const visibleProjects =
    activeCategories.size === 0
      ? projects
      : projects.filter((project) => activeCategories.has(project.category));

  const categoryCount = (category: Project["category"] | "All") =>
    category === "All"
      ? projects.length
      : projects.filter((project) => project.category === category).length;

  return (
    <SubPageLayout
      title={`All Projects — ${SITE.owner.name}`}
      description={`The full archive of ${SITE.owner.name}'s academic and personal projects — electronics, programming, and web development.`}
    >
      <div className="mb-10">
        <span className="inline-block font-mono text-xs tracking-wider uppercase text-[#4ADE80] mb-2">
          The Full Archive
        </span>
        <h1 className="text-4xl font-bold text-white mb-4">
          All Projects
        </h1>
        <p className="text-gray-300 max-w-3xl">
          Every academic and personal project I've worked on so far, in one place.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 mb-8">
        {CATEGORIES.map((category) => {
          const isActive = isOn(category);
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              aria-pressed={isActive}
              className="group flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            >
              <span
                className={`relative inline-block w-[30px] h-4 rounded-sm border transition-colors bg-[#081109] ${
                  isActive ? "border-[#4ADE80]" : "border-[#1f3a2b]"
                }`}
              >
                <span
                  className={`absolute top-[1px] bottom-[1px] w-[13px] rounded-[1px] transition-all ${
                    isActive ? "left-[15px] bg-[#4ADE80]" : "left-[1px] bg-gray-700"
                  }`}
                />
              </span>
              <span
                className={
                  isActive ? "text-[#4ADE80]" : "text-gray-400 group-hover:text-gray-300"
                }
              >
                {category}{" "}
                <span className={isActive ? "text-[#6EE7A8]" : "text-[#5f8a71]"}>
                  [{categoryCount(category)}]
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <m.div
        className="p-2 rounded-lg"
        style={blueprintFieldStyle}
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.1)}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {visibleProjects.map((project, index) => (
            <m.div key={project.slug} variants={fadeUpItem(0.4)}>
              <ProjectCard
                index={index}
                title={project.title}
                description={project.description}
                category={project.category}
                tags={project.tags}
                status={project.status}
                githubUrl={project.githubUrl}
                detailHref={project.overview ? `/projects/${project.slug}` : undefined}
                titleAs="h2"
              />
            </m.div>
          ))}
        </div>
      </m.div>

      {visibleProjects.length === 0 && (
        <p className="text-gray-400 text-center py-16">
          No projects in this category yet.
        </p>
      )}
    </SubPageLayout>
  );
}
