import type { Partner } from "@/types";

/**
 * Organizations shown in the Home "Trusted Partners & Network" slider, right under the Hero.
 * Only organizations Odyssey has run programs or contracted work with, as listed in the company decks
 * (track-record deck v1.3, 2026 company profile). Organizations without a logo file are shown as text.
 * To add a logo, put the file in /public/images/partners and set logoSrc.
 *
 * Example: { name: "Partner Name", logoSrc: "/images/partners/partner-name.svg", href: "https://partner.example" }
 */
export const partners: Partner[] = [
  // 2025: KSC Silicon Valley on-landing program (contracted), 1:1 expert advisory with ~20 experts.
  { name: "KSC Silicon Valley" },
  // 2025: KIC DC Tech Frontier_Startup Talk & Mixer.
  { name: "KIC DC", logoSrc: "/images/partners/kic-dc.png", href: "https://www.kicdc.org" },
  // 2025: KIRO robotics startup global meetup program.
  { name: "KIRO" },
  // 2024 global meetup program; 2025 fall Startup Design course (Software-centered University).
  { name: "Hanyang University ERICA", logoSrc: "/images/partners/hanyang-university.svg", href: "https://erica.hanyang.ac.kr" },
];
