import type { ServiceSlug } from "@/types";

export type AboutSectionKey = "overview" | "history" | "experts" | "team";

export type NewsSectionKey = "newsroom" | "faq" | "support";

/** A dropdown entry. `key` is looked up under "nav.aboutSections" (about), "nav" (services) or "nav.newsSections" (news). */
export type NavChild =
  | { group: "about"; key: AboutSectionKey; path: string }
  | { group: "services"; key: ServiceSlug; path: string }
  | { group: "news"; key: NewsSectionKey; path: string };

export interface MainNavItem {
  /** Dictionary key under "nav". */
  key: "about" | "services" | "news" | "membership" | "contact";
  /** Path without a language prefix. */
  path: string;
  /** Shown as a hover dropdown on desktop and indented links on mobile. */
  children?: readonly NavChild[];
}

/** Section ids on the About Us page. */
export const aboutSections = [
  { group: "about", key: "overview", path: "/about#overview" },
  { group: "about", key: "history", path: "/about#history" },
  { group: "about", key: "experts", path: "/about#experts" },
  { group: "about", key: "team", path: "/about#team" },
] as const satisfies readonly NavChild[];

export const serviceLinks = [
  { group: "services", key: "academy", path: "/academy" },
  { group: "services", key: "advisory", path: "/advisory" },
  { group: "services", key: "accelerator", path: "/accelerator" },
  { group: "services", key: "consulting", path: "/consulting" },
] as const satisfies readonly NavChild[];

export const newsLinks = [
  { group: "news", key: "newsroom", path: "/news" },
  { group: "news", key: "faq", path: "/faq" },
  { group: "news", key: "support", path: "/support" },
] as const satisfies readonly NavChild[];

export const mainNav: readonly MainNavItem[] = [
  { key: "about", path: "/about", children: aboutSections },
  { key: "services", path: "/#services", children: serviceLinks },
  { key: "news", path: "/news", children: newsLinks },
  { key: "membership", path: "/membership" },
  { key: "contact", path: "/contact" },
];

export const contactPath = "/contact";
