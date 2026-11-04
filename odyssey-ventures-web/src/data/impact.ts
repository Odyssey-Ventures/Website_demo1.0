import type { ImpactMetric } from "@/types";

/**
 * Figures for the Home "Our Impact" section. The UI only reads this list.
 *
 * - Only `verified: true` figures appear on the production site (website-demo12.vercel.app).
 *   Previews also show unverified figures, each with a "needs verification" label.
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

  // Figures from a past project, given as examples. Confirm each one and its basis, then set verified: true.
  {
    id: "startups-supported",
    value: 25,
    label: { ko: "지원 스타트업", en: "Startups supported" },
    basis: { ko: "집계 기준·기간 확인 필요", en: "Basis and period to be confirmed" },
    verified: false,
  },
  {
    id: "advisory-sessions",
    value: 59,
    label: { ko: "자문 세션", en: "Advisory sessions" },
    basis: { ko: "집계 기준·기간 확인 필요", en: "Basis and period to be confirmed" },
    verified: false,
  },
  {
    id: "program-participants",
    value: 16,
    label: { ko: "프로그램 참가자", en: "Program participants" },
    basis: { ko: "집계 기준·기간 확인 필요", en: "Basis and period to be confirmed" },
    verified: false,
  },
];
