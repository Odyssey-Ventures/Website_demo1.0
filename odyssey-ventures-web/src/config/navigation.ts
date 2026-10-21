import type { ServiceSlug } from "@/types";

/** `key` is the dictionary key under "nav"; `path` has no language prefix. */
export const mainNav = [
  { key: "academy", path: "/academy" },
  { key: "accelerator", path: "/accelerator" },
  { key: "advisory", path: "/advisory" },
] as const satisfies ReadonlyArray<{ key: ServiceSlug; path: string }>;

export const contactPath = "/#contact";
