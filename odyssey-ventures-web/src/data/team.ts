/**
 * Team members on the About Us page, in display order.
 * Text (name, title, credentials) lives under "aboutPage.team" in src/messages/*.json, keyed by `id`.
 */
export const team = [
  {
    id: "kevin-kim",
    photo: { src: "/images/team/kevin-kim.webp", width: 640, height: 773 },
    linkedin: "https://www.linkedin.com/in/kevinkim39/",
  },
  {
    id: "okkeun-lee",
    photo: { src: "/images/team/okkeun-lee.webp", width: 640, height: 726 },
    linkedin: "https://www.linkedin.com/in/okkeun-lee-67784696/",
  },
  {
    id: "juna-lee",
    photo: { src: "/images/team/juna-lee.webp", width: 413, height: 531 },
    linkedin: "https://www.linkedin.com/in/juna-lee-623590325/",
  },
] as const;
