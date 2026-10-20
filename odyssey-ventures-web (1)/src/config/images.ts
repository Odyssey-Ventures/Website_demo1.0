/**
 * Photos taken from the existing site (framerusercontent.com).
 * Width/height are the original pixel sizes reported by the live site.
 * Replace `src` with local files (e.g. "/images/hero.jpg") once downloaded into /public/images.
 */
export const images = {
  hero: {
    src: "https://framerusercontent.com/images/SJ2x9qqyHj382vIK2FwCHVERLQk.jpg?width=2371&height=1241",
    width: 2371,
    height: 1241,
    alt: "",
  },
  instructors: {
    src: "https://framerusercontent.com/images/iCLK1t6pYVps5X3Dd9EVjPU3lJ0.jpg?width=4032&height=3024",
    width: 4032,
    height: 3024,
    alt: "Odyssey Ventures instructors",
  },
  banner: {
    src: "https://framerusercontent.com/images/RohVjH8LD19M5pOyyfxbtGYExSw.jpg?width=4001&height=2253",
    width: 4001,
    height: 2253,
    alt: "",
  },
} as const;
