import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import ProjectCard from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { CircuitBoard, Code, Globe } from "lucide-react";

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

  const projects = [
    {
      title: "Basic Circuit Simulation",
      description:
        "A lab project simulating basic electronic circuits using software tools to understand fundamental electronic principles.",
      icon: <CircuitBoard className="h-20 w-20 text-[#3B82F6]" />,
      tags: ["Circuit Design", "Electronics", "Simulation"],
      status: "In Progress",
    },
    {
      title: "Simple C++ Programming Assignments",
      description:
        "Collection of academic assignments implementing basic algorithms and data structures in C++ to strengthen programming fundamentals.",
      icon: <Code className="h-20 w-20 text-[#3B82F6]" />,
      tags: ["C++", "Algorithms", "Programming"],
      status: "Ongoing",
    },
    {
      title: "Personal Portfolio Website",
      description:
        "Designing and developing this portfolio website to showcase my academic journey, skills, and future projects in electronic engineering.",
      icon: <Globe className="h-20 w-20 text-[#3B82F6]" />,
      tags: ["HTML", "CSS", "Web Design"],
      status: "Completed",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block text-[#A78BFA] font-medium mb-2">
            MY ACADEMIC WORK
          </span>
          <h2 className="text-4xl font-['Inter'] font-bold text-white mb-4">
            Academic Projects
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
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProjectCard
                title={project.title}
                description={project.description}
                icon={project.icon}
                tags={project.tags}
                status={project.status}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
