import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import ProjectCard from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
        <div className="mb-12">
          <span className="inline-block text-[#A78BFA] font-medium mb-2">
            MY ACADEMIC WORK
          </span>
          <h2 className="text-4xl font-['Inter'] font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-300 max-w-3xl">
            As a second-year student, I'm working on these educational projects
            to develop practical skills and apply theoretical knowledge.
          </p>
          <div className="h-1 w-20 bg-[#A78BFA] mt-4"></div>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.slug} variants={itemVariants}>
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

        <motion.div
          className="mt-16 flex flex-col items-center gap-6"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#A78BFA] hover:text-[#A78BFA]/80 font-['Inter'] font-medium transition-colors"
          >
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Interested in collaborating on academic projects or have
              suggestions?
            </p>
            <Button
              onClick={onContactClick}
              className="bg-[#A78BFA] hover:bg-[#A78BFA]/90 text-[#0F172A] font-['Inter'] font-medium shadow-lg"
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
