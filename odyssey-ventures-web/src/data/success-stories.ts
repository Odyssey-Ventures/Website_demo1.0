import type { SuccessStory } from "@/types";

/**
 * Add REAL, company-approved success stories here. Nothing is invented.
 * - Outcomes (funding, revenue, customers) only when verified and approved for publication.
 * - Logo or photo files go in /public/images/stories.
 * While empty, previews show labeled sample cards; the production site hides the section.
 *
 * Example:
 * {
 *   slug: "company-name",
 *   company: "Company Name",
 *   logoSrc: "/images/stories/company-logo.svg",
 *   imageSrc: "/images/stories/company-photo.webp",
 *   year: "2025",
 *   program: { ko: "로봇 스타트업 글로벌 프로그램", en: "Robotics Startup Global Program" },
 *   support: [{ ko: "IR 피칭 멘토링", en: "IR pitch mentoring" }],
 *   outcomes: [{ ko: "...", en: "..." }],
 *   body: { ko: "...", en: "..." },
 * }
 */
export const successStories: SuccessStory[] = [];
