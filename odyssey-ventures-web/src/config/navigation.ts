import type { ServiceSlug } from "@/types";

export type AboutSectionKey = "overview" | "history" | "board" | "team";

export interface MainNavItem {
  /** Dictionary key under "nav". */
  key: "about" | ServiceSlug;
  /** Path without a language prefix. */
  path: string;
  /** Shown as a hover dropdown on desktop and indented links on mobile. */
  children?: readonly { key: AboutSectionKey; path: string }[];
}

/** Section ids on the About Us page; `key` is the dictionary key under "nav.aboutSections". */
export const aboutSections = [
  { key: "overview", path: "/about#overview" },
  { key: "history", path: "/about#history" },
  { key: "board", path: "/about#board" },
  { key: "team", path: "/about#team" },
] as const satisfies ReadonlyArray<{ key: AboutSectionKey; path: string }>;

export const mainNav: readonly MainNavItem[] = [
  { key: "about", path: "/about", children: aboutSections },
  { key: "advisory", path: "/advisory" },
  { key: "academy", path: "/academy" },
  { key: "accelerator", path: "/accelerator" },
];

export const contactPath = "/#contact";
