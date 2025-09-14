export type ToolData = {
  slug: string;
  name: string;
  description: string;
  iframeUrl?: string;
  category: string;
  link: string;
  logo: string; // ✅ Added
};

export const toolsArray: ToolData[] = [
  {
    slug: "desmos-calculator",
    name: "Desmos Graphing Calculator",
    description: "Graph functions, plot data, and visualize math concepts.",
    iframeUrl: "https://www.desmos.com/calculator",
    category: "Math",
    link: "/tools/desmos-calculator",
    logo: "/logos/desmos.png",
  },
  {
    slug: "geogebra",
    name: "GeoGebra Math Tools",
    description: "Dynamic tools for geometry, algebra, calculus and more.",
    iframeUrl: "https://www.geogebra.org/graphing",
    category: "Math",
    link: "/tools/geogebra",
    logo: "/logos/geogebra.png",
  },
  {
    slug: "quizizz",
    name: "Quizizz",
    description:
      "Create or join gamified quizzes and flashcards for any topic.",
    iframeUrl: "https://quizizz.com/admin",
    category: "Quizzes",
    link: "/tools/quizizz",
    logo: "/logos/quizizz.png",
  },
  {
    slug: "desmos-scientific-calculator",
    name: "Desmos Scientific Calculator",
    description:
      "Full-featured scientific calculator with functions, trig, logs, and more.",
    iframeUrl: "https://www.desmos.com/scientific",
    category: "Math",
    link: "/tools/desmos-scientific-calculator",
    logo: "/logos/desmos.png",
  },
  {
    slug: "codesandbox",
    name: "CodeSandbox",
    description: "Collaborative online editor for web code projects.",
    iframeUrl: "https://codesandbox.io/embed/new",
    category: "Coding",
    link: "/tools/codesandbox",
    logo: "/logos/codesandbox.png",
  },
  {
    slug: "scratch",
    name: "Scratch Programming",
    description: "Creative coding with drag-and-drop blocks.",
    iframeUrl:
      "https://scratch.mit.edu/projects/861818624/embed?autostart=false",
    category: "Coding",
    link: "/tools/scratch",
    logo: "/logos/scratch.png",
  },
  {
    slug: "turbowarp-scratch",
    name: "TurboWarp Scratch Project",
    description: "Optimized fast-running Scratch project.",
    iframeUrl: "https://turbowarp.org/414716080/embed",
    category: "Coding",
    link: "/tools/turbowarp-scratch",
    logo: "/logos/turbowarp.png",
  },
  {
    slug: "phet-circuit-construction",
    name: "PhET: Circuit Construction Kit",
    description:
      "Build and explore electrical circuits with resistors, batteries, and bulbs.",
    iframeUrl:
      "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html",
    category: "Physics",
    link: "/tools/phet-circuit-construction",
    logo: "/logos/phet.png",
  },
  {
    slug: "phet-graphing-lines",
    name: "PhET: Graphing Lines",
    description:
      "Learn graphing and linear equations by exploring slope and intercept.",
    iframeUrl:
      "https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_en.html",
    category: "Math",
    link: "/tools/phet-graphing-lines",
    logo: "/logos/phet.png",
  },
  {
    slug: "phet-mass-spring",
    name: "PhET: Masses & Springs",
    description:
      "Investigate Hooke’s law and harmonic motion using springs and masses.",
    iframeUrl:
      "https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_en.html",
    category: "Physics",
    link: "/tools/phet-mass-spring",
    logo: "/logos/phet.png",
  },
  {
    slug: "phet-wave-on-a-string",
    name: "PhET: Wave on a String",
    description:
      "Visualize waves — adjust tension, damping, and frequency on a string.",
    iframeUrl:
      "https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html",
    category: "Physics",
    link: "/tools/phet-wave-on-a-string",
    logo: "/logos/phet.png",
  },
  {
    slug: "phet-energy-forms",
    name: "PhET: Energy Forms & Changes",
    description:
      "Explore energy conservation and transformations with interactive models.",
    iframeUrl:
      "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_en.html",
    category: "Physics",
    link: "/tools/phet-energy-forms",
    logo: "/logos/phet.png",
  },
  {
    slug: "phet-physics",
    name: "PhET Physics Simulations",
    description:
      "Interactive physics simulations for mechanics, electricity, waves, and more.",
    iframeUrl:
      "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html",
    category: "Physics",
    link: "/tools/phet-physics",
    logo: "/logos/phet.png",
  },
  {
    slug: "phet-masses-and-springs",
    name: "PhET: Masses & Springs",
    description:
      "Explore harmonic motion and Hooke’s law with springs and masses.",
    iframeUrl:
      "https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_en.html",
    category: "Physics",
    link: "/tools/phet-masses-and-springs",
    logo: "/logos/phet.png",
  },
  {
    slug: "phet-wave-string",
    name: "PhET: Wave on a String",
    description:
      "Visualize wave behavior: tension, frequency, amplitude, reflection.",
    iframeUrl:
      "https://phet.colorado.edu/sims/html/wave-on-a-string/latest/wave-on-a-string_en.html",
    category: "Physics",
    link: "/tools/phet-wave-string",
    logo: "/logos/phet.png",
  },
  {
    slug: "phet-area-model-multiplication",
    name: "PhET: Area Model Multiplication",
    description:
      "Use area models to visualize multiplication of multi-digit numbers.",
    iframeUrl:
      "https://phet.colorado.edu/sims/html/area-model-multiplication/latest/area-model-multiplication_en.html",
    category: "Math",
    link: "/tools/phet-area-model-multiplication",
    logo: "/logos/phet.png",
  },
  {
    slug: "phet-ray-optics",
    name: "PhET: Ray Optics",
    description:
      "Explore reflection, refraction, lenses, and total internal reflection.",
    iframeUrl:
      "https://phet.colorado.edu/sims/html/ray-optics/latest/ray-optics_en.html",
    category: "Physics",
    link: "/tools/phet-ray-optics",
    logo: "/logos/phet.png",
  },
  {
    slug: "phet-molecule-shapes",
    name: "PhET: Molecule Shapes",
    description:
      "Visualize 3D molecular geometry and build models using VSEPR.",
    iframeUrl:
      "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_en.html",
    category: "Chemistry",
    link: "/tools/phet-molecule-shapes",
    logo: "/logos/phet.png",
  },

  // ✅ New Polygon Explorer tool
  {
    slug: "polygon-explorer",
    name: "Polygon Explorer",
    description:
      "Visualize and explore regular polygons inside a circle, and learn about their sides, interior, and exterior angles.",
    category: "Math",
    link: "/tools/polygon-explorer",
    logo: "/logos/polygon.svg", // 👉 add a polygon icon in your /public/logos folder
  },
];

export const toolsMap: Record<string, ToolData> = Object.fromEntries(
  toolsArray.map((tool) => [tool.slug, tool])
);
