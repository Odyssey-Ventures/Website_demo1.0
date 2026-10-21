/**
 * Content for the About Us page.
 * History, board and team entries are placeholders: replace them with verified
 * names, titles and dates from the team. Do not publish invented details.
 */

export interface Milestone {
  year: string;
  text: string;
}

export interface Person {
  name: string;
  role: string;
  bio?: string;
  /** Path inside /public, e.g. "/images/team/jane.jpg" */
  photoSrc?: string;
}

export const overview = {
  title: "Company Overview",
  lead: "Helping startups expand into the U.S.",
  paragraphs: [
    "Odyssey Ventures is a Silicon Valley-based education, consulting and startup accelerator company. We help startups and businesses build the product, fundraising and sales capabilities they need to succeed in global markets.",
    "Through Academy, Accelerator and Advisory, we support teams from their first market research through U.S. market entry and their first potential customers.",
  ],
  pillars: [
    { title: "Academy", text: "Education for global markets" },
    { title: "Accelerator", text: "Structured support for entering the U.S." },
    { title: "Advisory", text: "Direct guidance from experts" },
  ],
};

// TODO: replace with the company's real history.
export const history: Milestone[] = [
  { year: "YYYY", text: "Milestone to be added" },
  { year: "YYYY", text: "Milestone to be added" },
  { year: "YYYY", text: "Milestone to be added" },
  { year: "YYYY", text: "Milestone to be added" },
];

// TODO: replace with the real board members.
export const board: Person[] = [
  { name: "Name", role: "Title" },
  { name: "Name", role: "Title" },
  { name: "Name", role: "Title" },
];

// TODO: replace with the real team members.
export const team: Person[] = [
  { name: "Name", role: "Role" },
  { name: "Name", role: "Role" },
  { name: "Name", role: "Role" },
  { name: "Name", role: "Role" },
];
