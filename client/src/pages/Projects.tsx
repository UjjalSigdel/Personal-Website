import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard, { blueprintFieldStyle } from "@/components/ui/project-card";
import { projects, type Project } from "@/lib/projects";

const CATEGORIES: Array<Project["category"] | "All"> = [
  "All",
  "Electronics",
  "Programming",
  "Web Development",
];

export default function Projects() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState<Project["category"] | "All">("All");

  // Client-side routing preserves scroll position across navigations — start at
  // the top rather than wherever the previous page had scrolled to.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const visibleProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const goHomeSection = (hash: string) => () => setLocation(hash ? `/#${hash}` : "/");

  return (
    <div className="font-['Roboto'] text-gray-800 bg-[#0F172A] min-h-screen">
      <Header
        onHomeClick={goHomeSection("")}
        onAboutClick={goHomeSection("about")}
        onSkillsClick={goHomeSection("skills")}
        onProjectsClick={goHomeSection("projects")}
        onContactClick={goHomeSection("contact")}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={goHomeSection("")}
            className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-[#4ADE80] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            $ cd ..
          </button>

          <div className="mb-10">
            <span className="inline-block font-mono text-xs tracking-wider uppercase text-[#4ADE80] mb-2">
              The Full Archive
            </span>
            <h1 className="text-4xl font-['Inter'] font-bold text-white mb-4">
              All Projects
            </h1>
            <p className="text-gray-300 max-w-3xl">
              Every academic and personal project I've worked on so far, in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 mb-8">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="group flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase"
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
                    {category}
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div
            className="p-1.5 rounded-lg"
            style={blueprintFieldStyle}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 p-3.5">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <ProjectCard
                    index={index}
                    title={project.title}
                    description={project.description}
                    category={project.category}
                    tags={project.tags}
                    status={project.status}
                    githubUrl={project.githubUrl}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {visibleProjects.length === 0 && (
            <p className="text-gray-400 text-center py-16">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      <Footer
        onHomeClick={goHomeSection("")}
        onAboutClick={goHomeSection("about")}
        onSkillsClick={goHomeSection("skills")}
        onProjectsClick={goHomeSection("projects")}
        onContactClick={goHomeSection("contact")}
      />
    </div>
  );
}
