import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ui/project-card";
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
          <div className="mb-12">
            <span className="inline-block text-[#A78BFA] font-medium mb-2">
              THE FULL ARCHIVE
            </span>
            <h1 className="text-4xl font-['Inter'] font-bold text-white mb-4">
              All Projects
            </h1>
            <p className="text-gray-300 max-w-3xl">
              Every academic and personal project I've worked on so far, in one place.
            </p>
            <div className="h-1 w-20 bg-[#A78BFA] mt-4"></div>
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-['Inter'] font-medium transition-colors border ${
                  activeCategory === category
                    ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                    : "bg-transparent text-gray-300 border-gray-700 hover:border-gray-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {visibleProjects.map((project) => (
              <motion.div
                key={project.slug}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  icon={project.icon}
                  tags={project.tags}
                  status={project.status}
                  githubUrl={project.githubUrl}
                />
              </motion.div>
            ))}
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
