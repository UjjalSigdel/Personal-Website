export interface Project {
  slug: string;
  title: string;
  description: string;
  category: "Electronics" | "Programming" | "Web Development";
  tags: string[];
  status: "Completed" | "In Progress" | "Ongoing";
  featured: boolean;
  githubUrl?: string;
  // Detail-page fields — all optional. A project gets a /projects/:slug page
  // (and its card a "read more →" link) only when `overview` is set.
  overview?: string;
  tools?: string[];
  started?: string;
  notebook?: Array<{ date: string; entry: string }>;
  screenshots?: Array<{ src: string; caption: string }>;
  liveUrl?: string;
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
    overview:
      "A lab project simulating basic electronic circuits using software tools. The goal isn't just getting the simulation to run — it's understanding the fundamentals well enough to predict how a circuit behaves before building it.",
    tools: ["Circuit simulation software", "Lab coursework"],
    notebook: [
      {
        date: "now",
        entry: "Getting the full simulation working end to end.",
      },
    ],
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
    overview:
      "A growing collection of academic assignments implementing basic algorithms and data structures in C++. Each one is small on its own — together they're how the programming fundamentals actually stuck.",
    tools: ["C++", "University coursework"],
    notebook: [
      {
        date: "ongoing",
        entry:
          "New assignments land with coursework — each adds another algorithm or data structure to the collection.",
      },
    ],
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
    overview:
      "This site — designed and developed to showcase my academic journey, skills, and projects. It's also been the best teacher: every section you're looking at was rebuilt at least once while I figured out what I actually wanted it to say.",
    tools: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    liveUrl: "https://www.ujjalsigdel.com.np",
    notebook: [
      {
        date: "v1",
        entry:
          "First version shipped from a scaffolded template — it worked, but it looked like everyone else's portfolio.",
      },
      {
        date: "2026-07",
        entry:
          "Full redesign: dead code and 35 unused dependencies removed, a terminal-inspired visual identity built section by section, and this project archive added.",
      },
      {
        date: "now",
        entry: "Maintained as a long-term project — the roadmap lives in the repo.",
      },
    ],
  },
];
