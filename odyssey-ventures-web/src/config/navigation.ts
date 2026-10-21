export interface NavItem {
  label: string;
  href: string;
  /** Shown as a hover dropdown on desktop and indented links on mobile. */
  children?: NavItem[];
}

export const aboutSections: NavItem[] = [
  { label: "Company Overview", href: "/about#overview" },
  { label: "History", href: "/about#history" },
  { label: "Board of Directors", href: "/about#board" },
  { label: "Team", href: "/about#team" },
];

export const mainNav: NavItem[] = [
  { label: "About Us", href: "/about", children: aboutSections },
  { label: "Advisory", href: "/advisory" },
  { label: "Academy", href: "/academy" },
  { label: "Accelerator", href: "/accelerator" },
];

export const contactHref = "/#contact";
