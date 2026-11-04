import type { Partner } from "@/types";

/**
 * Logos for the Home "Trusted Partners & Network" slider, shown right under the Hero.
 * Add only organizations that have agreed to be shown, with their real logo files in /public/images/partners
 * (SVG or transparent PNG/WebP; any size, they are scaled to the same height).
 *
 * Example: { name: "Partner Name", logoSrc: "/images/partners/partner-name.svg", href: "https://partner.example" }
 *
 * While empty, previews show labeled empty slots and the production site hides the section.
 */
export const partners: Partner[] = [];
