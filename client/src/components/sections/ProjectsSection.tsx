import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import ProjectCard, { blueprintFieldStyle } from "@/components/ui/project-card";
import { projects } from "@/lib/projects";

interface ProjectsSectionProps {
  onContactClick: () => void;
}

export default function ProjectsSection({
  onContactClick,
}: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section ref={sectionRef} className="py-20 bg-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-block font-mono text-xs tracking-wider uppercase text-[#4ADE80] mb-2">
            Featured Projects
          </span>
          <h2 className="text-4xl font-['Inter'] font-bold text-white mb-4">
            What I've been building
          </h2>
          <p className="text-gray-300 max-w-3xl">
            A few things I'm working through as a second-year student, in one place.
          </p>
        </div>

        <motion.div
          className="p-1.5 rounded-lg"
          style={blueprintFieldStyle}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 p-3.5">
            {featuredProjects.map((project, index) => (
              <motion.div key={project.slug} variants={itemVariants}>
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

        <motion.div
          className="mt-12 flex flex-col items-center gap-6"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Link
            href="/projects"
            className="inline-flex font-mono text-sm px-3 py-2 rounded-md border border-[#2b5940] bg-[#122318] text-[#6EE7A8] hover:bg-[#173626] transition-colors"
          >
            $ cd /projects
          </Link>
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Interested in collaborating on academic projects or have
              suggestions?
            </p>
            <button
              onClick={onContactClick}
              className="inline-flex font-mono text-sm px-4 py-2.5 rounded-md border border-[#2b5940] bg-[#122318] text-[#6EE7A8] hover:bg-[#173626] transition-colors"
            >
              $ get --in-touch
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
