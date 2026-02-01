// =====================
// Project Data Types
// =====================

export type WorkCategory =
  | "Art Direction"
  | "Branding / Visual Identity"
  | "Editorial Design"
  | "Photography"
  | "Campaign / Concept"
  | "Spatial / Exhibition Design"
  | "3D Design"
  | "Motion Design"
  | "Type Design"
  | "Poster System";

export type MediaItem =
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      type: "video";
      src: string;
      alt: string;
      caption?: string;
      poster?: string;
    };

export type ProjectWriteup = {
  tagline: string;
  overview: string;
  context: string;
  approach: string[];
  deliverables: string[];
  tools: string[];
  notes?: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  clientLine: string;
  year: string;
  categories: WorkCategory[];
  roles: string[];
  cover: {
    src: string;
    alt: string;
    type?: "image" | "video";
    poster?: string;
  };
  gallery: MediaItem[];
  writeup: ProjectWriteup;
};

// =====================
// Filter Categories (for UI)
// =====================

export const filterCategories: WorkCategory[] = [
  "Art Direction",
  "Branding / Visual Identity",
  "Campaign / Concept",
  "Motion Design",
  "Type Design",
  "Editorial Design",
  "3D Design",
];

// =====================
// Projects Data
// =====================

export const projects: Project[] = [
  // ─────────────────────────────────────────────
  // 001 — TECHUNTER
  // ─────────────────────────────────────────────
  {
    slug: "techunter",
    index: "001",
    title: "Techunter",
    clientLine: "Brand Identity",
    year: "2024",
    categories: [
      "Branding / Visual Identity",
      "Art Direction",
      "Editorial Design",
    ],
    roles: ["Art Direction", "Brand Identity", "Editorial Design"],
    cover: {
      src: "/projects/techunter/cover.jpg",
      alt: "Techunter brand identity cover",
      type: "image",
    },
    gallery: [
      {
        type: "image",
        src: "/projects/techunter/01.jpg",
        alt: "Techunter logo lockup",
      },
      {
        type: "image",
        src: "/projects/techunter/02.jpg",
        alt: "Techunter typography system",
      },
      {
        type: "image",
        src: "/projects/techunter/03.jpg",
        alt: "Techunter visual identity",
      },
      {
        type: "image",
        src: "/projects/techunter/04.jpg",
        alt: "Techunter brand applications",
      },
      {
        type: "image",
        src: "/projects/techunter/05.jpg",
        alt: "Techunter editorial design",
      },
      {
        type: "image",
        src: "/projects/techunter/06.jpg",
        alt: "Techunter print collateral",
      },
      {
        type: "image",
        src: "/projects/techunter/07.jpg",
        alt: "Techunter brand guidelines",
      },
    ],
    writeup: {
      tagline: "A bold identity for tomorrow's tech talent hunters.",
      overview:
        "Techunter is a recruitment platform connecting cutting-edge tech companies with exceptional talent. The brand identity needed to bridge the gap between corporate professionalism and the dynamic, forward-thinking nature of the tech industry.",
      context:
        "Operating in a saturated market of recruitment agencies, Techunter required a distinctive visual language that would resonate with both innovative startups and established tech giants. The challenge was to create an identity that feels premium yet approachable, technical yet human.",
      approach: [
        "Developed a modular logo system that adapts across digital and print touchpoints",
        "Created a bold typographic hierarchy using geometric sans-serifs",
        "Established a color palette balancing professionalism with tech-forward energy",
        "Designed a comprehensive icon set for platform navigation",
        "Built flexible layout systems for various content types",
      ],
      deliverables: [
        "Logo & Logo System",
        "Brand Guidelines",
        "Typography System",
        "Color Palette",
        "Icon Set",
        "Business Cards & Stationery",
        "Editorial Templates",
        "Digital Asset Library",
      ],
      tools: ["Figma", "Illustrator", "InDesign", "After Effects"],
    },
  },

  // ─────────────────────────────────────────────
  // 002 — NIKE ACG
  // ─────────────────────────────────────────────
  {
    slug: "nike-acg",
    index: "002",
    title: "Nike ACG",
    clientLine: "Spec Concept",
    year: "2024",
    categories: ["Campaign / Concept", "Art Direction", "Editorial Design"],
    roles: ["Art Direction", "Campaign Concept", "Visual Design"],
    cover: {
      src: "/projects/nike-acg/cover.jpg",
      alt: "Nike ACG campaign concept cover",
      type: "image",
    },
    gallery: [
      {
        type: "image",
        src: "/projects/nike-acg/01.jpg",
        alt: "Nike ACG hero visual",
      },
      {
        type: "image",
        src: "/projects/nike-acg/02.jpg",
        alt: "Nike ACG product photography",
      },
      {
        type: "image",
        src: "/projects/nike-acg/03.jpg",
        alt: "Nike ACG campaign layout",
      },
      {
        type: "image",
        src: "/projects/nike-acg/04.jpg",
        alt: "Nike ACG editorial spread",
      },
      {
        type: "image",
        src: "/projects/nike-acg/05.jpg",
        alt: "Nike ACG lookbook design",
      },
      {
        type: "image",
        src: "/projects/nike-acg/06.jpg",
        alt: "Nike ACG brand application",
      },
    ],
    writeup: {
      tagline: "Where urban exploration meets alpine performance.",
      overview:
        "A speculative campaign concept for Nike ACG (All Conditions Gear) exploring the intersection of metropolitan environments and wilderness preparation. The visual study reimagines how the sub-brand could communicate its dual identity.",
      context:
        "Nike ACG exists at the crossroads of city life and outdoor adventure. This concept explores how campaign materials could speak to urbanites who seek weekend escapes without abandoning their metropolitan aesthetic sensibilities.",
      approach: [
        "Juxtaposed architectural photography with natural landscapes",
        "Developed a visual language blending technical specs with lifestyle imagery",
        "Created typographic treatments echoing topographical maps",
        "Explored color grading that transitions from concrete to forest",
        "Designed layouts that mirror the journey from city to summit",
      ],
      deliverables: [
        "Campaign Concept",
        "Art Direction",
        "Editorial Layouts",
        "Lookbook Design",
        "Visual Identity Extensions",
        "Social Media Templates",
      ],
      tools: ["Photoshop", "InDesign", "Lightroom", "Figma"],
      notes:
        "This is a speculative concept/visual study and is not affiliated with or endorsed by Nike, Inc.",
    },
  },

  // ─────────────────────────────────────────────
  // 003 — BLACK CROWS
  // ─────────────────────────────────────────────
  {
    slug: "black-crows",
    index: "003",
    title: "Black Crows",
    clientLine: "Visual Study",
    year: "2024",
    categories: ["Campaign / Concept", "Art Direction", "Editorial Design"],
    roles: ["Art Direction", "Visual Study", "Editorial Design"],
    cover: {
      src: "/projects/black-crows/cover.jpg",
      alt: "Black Crows visual study cover",
      type: "image",
    },
    gallery: [
      {
        type: "image",
        src: "/projects/black-crows/01.jpg",
        alt: "Black Crows brand exploration",
      },
      {
        type: "image",
        src: "/projects/black-crows/02.jpg",
        alt: "Black Crows ski collection",
      },
      {
        type: "image",
        src: "/projects/black-crows/03.jpg",
        alt: "Black Crows product showcase",
      },
      {
        type: "image",
        src: "/projects/black-crows/04.jpg",
        alt: "Black Crows editorial layout",
      },
      {
        type: "image",
        src: "/projects/black-crows/05.jpg",
        alt: "Black Crows campaign visual",
      },
      {
        type: "image",
        src: "/projects/black-crows/06.jpg",
        alt: "Black Crows brand application",
      },
    ],
    writeup: {
      tagline: "Freeride spirit, refined aesthetics.",
      overview:
        "A visual exploration for Black Crows, the Chamonix-born ski brand known for its distinctive approach to freeride equipment. This study investigates how their rebellious spirit could translate into a cohesive campaign language.",
      context:
        "Black Crows occupies a unique position in ski culture—premium craftsmanship with an anti-establishment attitude. The visual study explores how to honor their French Alpine heritage while pushing creative boundaries.",
      approach: [
        "Captured the raw energy of freeride culture through dynamic compositions",
        "Developed a visual rhythm alternating between action and stillness",
        "Integrated the iconic crow motif into unexpected applications",
        "Explored typography that echoes mountain terrain contours",
        "Created a color story inspired by alpine dawn and dusk",
      ],
      deliverables: [
        "Campaign Concept",
        "Editorial Design",
        "Lookbook Layouts",
        "Visual Identity Study",
        "Art Direction",
        "Photography Direction",
      ],
      tools: ["InDesign", "Photoshop", "Lightroom", "Illustrator"],
      notes:
        "This is a speculative visual study and is not affiliated with or endorsed by Black Crows.",
    },
  },

  // ─────────────────────────────────────────────
  // 004 — OAKLEY
  // ─────────────────────────────────────────────
  {
    slug: "oakley",
    index: "004",
    title: "Oakley",
    clientLine: "Spec Concept",
    year: "2024",
    categories: ["Campaign / Concept", "Art Direction", "3D Design"],
    roles: ["Art Direction", "3D Design", "Campaign Concept"],
    cover: {
      src: "/projects/oakley/cover.jpg",
      alt: "Oakley spec concept cover",
      type: "image",
    },
    gallery: [
      {
        type: "image",
        src: "/projects/oakley/01.jpg",
        alt: "Oakley product render",
      },
      {
        type: "image",
        src: "/projects/oakley/02.jpg",
        alt: "Oakley campaign visual",
      },
      {
        type: "image",
        src: "/projects/oakley/03.jpg",
        alt: "Oakley 3D exploration",
      },
      {
        type: "image",
        src: "/projects/oakley/04.jpg",
        alt: "Oakley brand application",
      },
      {
        type: "image",
        src: "/projects/oakley/05.jpg",
        alt: "Oakley editorial design",
      },
      {
        type: "image",
        src: "/projects/oakley/06.jpg",
        alt: "Oakley visual identity",
      },
    ],
    writeup: {
      tagline: "Performance optics through a futuristic lens.",
      overview:
        "A speculative concept reimagining Oakley's visual language for a new generation of athletes and style-conscious consumers. The study explores how the brand's heritage of innovation could inform a more avant-garde aesthetic direction.",
      context:
        "Oakley has always been at the forefront of eyewear technology and design. This concept pushes their visual identity into more experimental territory while maintaining the performance-driven DNA that defines the brand.",
      approach: [
        "Developed 3D visualizations emphasizing product engineering",
        "Created abstract compositions highlighting lens technology",
        "Explored holographic and prismatic visual treatments",
        "Designed typography systems inspired by technical specifications",
        "Built a visual language bridging sport and streetwear cultures",
      ],
      deliverables: [
        "Campaign Concept",
        "3D Product Visualizations",
        "Art Direction",
        "Editorial Layouts",
        "Visual Identity Extensions",
        "Digital Asset Design",
      ],
      tools: ["Cinema 4D", "Octane Render", "Photoshop", "After Effects"],
      notes:
        "This is a speculative concept and is not affiliated with or endorsed by Oakley, Inc.",
    },
  },

  // ─────────────────────────────────────────────
  // 005 — CIRCA
  // ─────────────────────────────────────────────
  {
    slug: "circa",
    index: "005",
    title: "Circa",
    clientLine: "Type & Motion",
    year: "2024",
    categories: ["Type Design", "Motion Design", "Art Direction"],
    roles: ["Type Design", "Motion Design", "Art Direction"],
    cover: {
      src: "/projects/circa/cover.mp4",
      alt: "Circa type and motion cover",
      type: "video",
    },
    gallery: [
      {
        type: "image",
        src: "/projects/circa/01.png",
        alt: "Circa typography exploration",
      },
      {
        type: "image",
        src: "/projects/circa/02.png",
        alt: "Circa letterforms",
      },
      {
        type: "video",
        src: "/projects/circa/03.mp4",
        alt: "Circa motion study 1",
      },
      {
        type: "video",
        src: "/projects/circa/04.mp4",
        alt: "Circa motion study 2",
      },
      {
        type: "video",
        src: "/projects/circa/05.mp4",
        alt: "Circa animated typography",
      },
    ],
    writeup: {
      tagline: "Typography in motion, letterforms alive.",
      overview:
        "Circa is an experimental type and motion project exploring the boundaries between static letterforms and kinetic expression. The project investigates how typography can become a living, breathing visual element.",
      context:
        "In an era of increasingly dynamic digital experiences, typography must evolve beyond its static origins. Circa serves as a laboratory for testing how letters can move, morph, and communicate emotion through animation.",
      approach: [
        "Designed custom letterforms optimized for animation",
        "Developed a motion language based on organic movements",
        "Created modular animation systems for flexible applications",
        "Explored the rhythm and timing of typographic motion",
        "Tested various rendering techniques for optimal visual impact",
      ],
      deliverables: [
        "Custom Typeface",
        "Motion Design System",
        "Animated Specimens",
        "Style Frames",
        "Loop Animations",
        "Art Direction Guidelines",
      ],
      tools: ["After Effects", "Illustrator", "Cinema 4D", "Glyphs"],
    },
  },
];

// =====================
// Helper Functions
// =====================

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(currentSlug: string): Project {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  return projects[(currentIndex + 1) % projects.length];
}

export function getPrevProject(currentSlug: string): Project {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  return projects[(currentIndex - 1 + projects.length) % projects.length];
}

export function filterProjectsByCategory(
  category: WorkCategory | "All",
): Project[] {
  if (category === "All") return projects;
  return projects.filter((p) => p.categories.includes(category));
}
