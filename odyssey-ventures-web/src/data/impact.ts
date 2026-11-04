import type { ImpactMetric } from "@/types";

/**
 * Figures for the Home "Our Impact" section. The UI only reads this list.
 *
 * - Only `verified: true` figures appear on the production site (website-demo12.vercel.app).
 *   Previews also show unverified figures, each with a "needs verification" label.
 * - Sources: company profile 2026 and track-record deck v1.3. The 25 / 59 / 16 example figures were removed:
 *   neither deck contains them and their basis is unknown.
 * - Every figure is counted on its own basis. Do not add them up or present them as a company-wide total.
 * - Three or four verified figures fit the row best.
 */
export const impactMetrics: ImpactMetric[] = [
  // Company profile figures. Already on the live site before this section was redesigned.
  {
    id: "founded",
    value: 2018,
    animate: false,
    label: { ko: "실리콘밸리에서 설립", en: "Founded in Silicon Valley" },
    verified: true,
  },
  {
    id: "expert-network",
    value: 100,
    suffix: "+",
    label: { ko: "비즈니스·기술 전문가 네트워크", en: "Business and technology experts in our network" },
    verified: true,
  },
  {
    id: "programs-2025",
    value: 7,
    label: { ko: "2025년 운영·기획한 프로그램", en: "Programs run or organized in 2025" },
    verified: true,
  },
  {
    id: "ceo-experience",
    value: 12,
    suffix: { ko: "년", en: " yrs" },
    label: { ko: "대표의 스타트업 멘토링·컨설팅 경력", en: "Our CEO's startup mentoring and consulting experience" },
    verified: true,
  },
];
