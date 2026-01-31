export type CollageItem = {
  id: string;
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
  depth: number;
  rotate?: number;
};

export const collageItems: CollageItem[] = [
  {
    id: "a",
    src: "/projects/techunter/01.jpg",
    alt: "Techunter — Brand Identity",
    x: 8,
    y: 15,
    w: 180,
    h: 240,
    depth: 0.12,
    rotate: -3,
  },
  {
    id: "b",
    src: "/projects/nike-acg/02.jpg",
    alt: "Nike ACG — Campaign",
    x: 75,
    y: 10,
    w: 200,
    h: 150,
    depth: 0.08,
    rotate: 2,
  },
  {
    id: "c",
    src: "/projects/black-crows/03.jpg",
    alt: "Black Crows — Visual",
    x: 5,
    y: 60,
    w: 160,
    h: 160,
    depth: 0.15,
  },
  {
    id: "d",
    src: "/projects/oakley/04.jpg",
    alt: "Oakley — 3D Exploration",
    x: 80,
    y: 55,
    w: 140,
    h: 200,
    depth: 0.1,
    rotate: -2,
  },
  {
    id: "e",
    src: "/projects/circa/01.png",
    alt: "Circa — Typography",
    x: 25,
    y: 75,
    w: 220,
    h: 140,
    depth: 0.06,
    rotate: 1,
  },
  {
    id: "f",
    src: "/projects/techunter/05.jpg",
    alt: "Techunter — Editorial",
    x: 60,
    y: 80,
    w: 180,
    h: 180,
    depth: 0.18,
    rotate: -4,
  },
  {
    id: "g",
    src: "/projects/nike-acg/cover.jpg",
    alt: "Nike ACG — Cover",
    x: 40,
    y: 5,
    w: 150,
    h: 200,
    depth: 0.09,
  },
  {
    id: "h",
    src: "/projects/black-crows/cover.jpg",
    alt: "Black Crows — Cover",
    x: 15,
    y: 40,
    w: 120,
    h: 160,
    depth: 0.14,
    rotate: 3,
  },
];
