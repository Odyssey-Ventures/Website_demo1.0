interface TeamMember {
  /** Key under "aboutPage.team" in src/messages/*.json, where the name, title and credentials live. */
  id: "kevin-kim" | "okkeun-lee" | "juye-kim" | "yoomi-yi" | "juna-lee" | "seunghoon-baek";
  /** Members without a photo show their initials instead. */
  photo?: { src: string; width: number; height: number };
  linkedin?: string;
}

/** Team members on the About Us page, in display order. */
export const team: readonly TeamMember[] = [
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
  { id: "juye-kim" },
  { id: "yoomi-yi" },
  {
    id: "juna-lee",
    photo: { src: "/images/team/juna-lee.webp", width: 413, height: 531 },
    linkedin: "https://www.linkedin.com/in/juna-lee-623590325/",
  },
  { id: "seunghoon-baek" },
];
