export interface Project {
  slug: string;
  title: string;
  description: string;
  category: "Electronics" | "Programming" | "Web Development";
  tags: string[];
  status: "Completed" | "In Progress" | "Ongoing";
  featured: boolean;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "basic-circuit-simulation",
    title: "Basic Circuit Simulation",
    description:
      "A lab project simulating basic electronic circuits using software tools to understand fundamental electronic principles.",
    category: "Electronics",
    tags: ["Circuit Design", "Electronics", "Simulation"],
    status: "In Progress",
    featured: true,
  },
  {
    slug: "cpp-programming-assignments",
    title: "Simple C++ Programming Assignments",
    description:
      "Collection of academic assignments implementing basic algorithms and data structures in C++ to strengthen programming fundamentals.",
    category: "Programming",
    tags: ["C++", "Algorithms", "Programming"],
    status: "Ongoing",
    featured: true,
  },
  {
    slug: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    description:
      "Designing and developing this portfolio website to showcase my academic journey, skills, and future projects in electronic engineering.",
    category: "Web Development",
    tags: ["HTML", "CSS", "Web Design"],
    status: "Completed",
    featured: true,
    githubUrl: "https://github.com/UjjalSigdel/Personal-Website",
  },
];
