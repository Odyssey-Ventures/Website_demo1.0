import type { Service } from "@/types";

/**
 * Structure only. Service names come from "nav" and descriptions from "services.cards"
 * in src/messages/*.json. The previous English summaries are kept in docs/original-english-content.md.
 */
export const services: Service[] = [
  { slug: "academy", path: "/academy" },
  { slug: "advisory", path: "/advisory" },
  { slug: "accelerator", path: "/accelerator" },
  { slug: "consulting", path: "/consulting" },
];
