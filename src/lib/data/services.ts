export type Service = {
  id: string;
  label: string;
  index: string;
  preview: string;
  description?: string;
};

export const services: Service[] = [
  {
    id: "art-direction",
    label: "Art Direction",
    index: "001",
    preview: "/projects/nike-acg/01.jpg",
    description: "Strategic visual guidance for brands and campaigns.",
  },
  {
    id: "branding",
    label: "Branding",
    index: "002",
    preview: "/projects/techunter/cover.jpg",
    description: "Complete brand identity systems and visual languages.",
  },
  {
    id: "motion-graphics",
    label: "Motion Graphics",
    index: "003",
    preview: "/projects/circa/01.png",
    description: "Dynamic visual storytelling through animation.",
  },
  {
    id: "editorial",
    label: "Editorial Design",
    index: "004",
    preview: "/projects/black-crows/04.jpg",
    description: "Print and digital publication design.",
  },
];
