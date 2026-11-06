/**
 * Academy webinar instructors, shown on the Academy page.
 * Photos are from the 2026 company profile (page 9). Titles and bios are added once confirmed;
 * until then each card shows the name and the LinkedIn profile.
 */
export interface Instructor {
  id: string;
  name: string;
  photo?: string;
  linkedin: string;
}

export const instructors: readonly Instructor[] = [
  { id: "okkeun-lee", name: "Okkeun Lee", photo: "/images/experts/okkeun-lee.webp", linkedin: "https://www.linkedin.com/in/okkeun-lee-67784696/" },
  { id: "jinwon-lee", name: "Jinwon Lee", photo: "/images/experts/jinwon-lee.webp", linkedin: "https://www.linkedin.com/in/jinwon-lee-38ab1019/" },
  { id: "haley-park", name: "Haley Park", photo: "/images/experts/haley-park.webp", linkedin: "https://www.linkedin.com/in/hellohaleypark/" },
  { id: "kyuha-park", name: "Kyuha Park", linkedin: "https://www.linkedin.com/in/kyuhapark/" },
  { id: "jaehyun-yeom", name: "Jaehyun Yeom", linkedin: "https://www.linkedin.com/in/jaehyunyeom/" },
];
