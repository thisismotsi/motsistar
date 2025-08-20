export type Affiliate = {
  name: string;
  description: string;
  logo: string;
  link: string;
  category: string;
};

export const affiliates: Affiliate[] = [
  {
    name: "Preply",
    description:
      "Find online tutors for personalized 1‑on‑1 language and subject lessons.",
    logo: "/logos/preply.png",
    link: "https://preply.com",
    category: "Courses",
  },
  {
    name: "Desmos",
    description:
      "Explore interactive math graphs, simulations, and digital whiteboards.",
    logo: "/logos/desmos.png",
    link: "https://www.desmos.com",
    category: "Simulations",
  },
  {
    name: "GeoGebra",
    description:
      "Powerful math tools for geometry, algebra, calculus, and statistics.",
    logo: "/logos/geogebra.png",
    link: "https://www.geogebra.org",
    category: "Simulations",
  },
  {
    name: "CodeSandbox",
    description:
      "Collaborative online code editor and dev environment for web projects.",
    logo: "/logos/codesandbox.png",
    link: "https://codesandbox.io",
    category: "Coding",
  },

  {
    name: "Quizlet",
    description:
      "Create flashcards and study sets for active recall and memorization.",
    logo: "/logos/quizlet.png",
    link: "https://www.quizlet.com",
    category: "Tools",
  },

  {
    name: "Scratch",
    description:
      "Learn coding through playful drag-and-drop block programming.",
    logo: "/logos/scratch.png",
    link: "https://scratch.mit.edu",
    category: "Coding",
  },
  {
    name: "Turbowarp",
    description:
      "A faster, feature-rich Scratch editor with extended capabilities.",
    logo: "/logos/turbowarp.png",
    link: "https://turbowarp.org",
    category: "Coding",
  },
];
