import type { Program } from "@/types";

/**
 * Programs normally live in the "Programs" Google Sheet (PROGRAMS_CSV_URL).
 * Anything added here is used only when the sheet is not connected.
 */
export const programs: Program[] = [
  // Sample webinar for reviewing the schedule layout. Replace or remove before launch.
  {
    id: "us-market-entry-webinar",
    type: "webinar",
    title: {
      ko: "[샘플] 실리콘밸리에서 본 미국 시장 진출 첫걸음",
      en: "[Sample] First steps into the U.S. market, from Silicon Valley",
    },
    summary: {
      ko: "미국 진출을 준비하는 스타트업을 위해 현지 시장 검증, 세일즈 전략, 투자 유치 흐름을 1시간 동안 정리합니다.",
      en: "A one-hour overview of market validation, sales strategy and fundraising for startups preparing to enter the U.S.",
    },
    description: {
      ko: "미국 시장에 처음 진출하려는 스타트업이 가장 많이 묻는 질문을 중심으로 진행합니다.\n1부: 미국 고객과 시장을 검증하는 방법\n2부: 첫 현지 세일즈 파이프라인 만들기\n3부: 실리콘밸리 투자자가 보는 포인트와 Q&A",
      en: "Built around the questions startups ask most before entering the U.S.\nPart 1: Validating U.S. customers and the market\nPart 2: Building a first local sales pipeline\nPart 3: What Silicon Valley investors look for, plus Q&A",
    },
    date: "2026-11-19",
    startTime: "17:00",
    endTime: "18:00",
    timezone: "PT",
    instructor: "Okkeun Lee",
    format: "Zoom",
    capacity: "50",
    registrationOpen: true,
  },
];

/**
 * Shown ONLY outside production (local and Vercel previews) while no real program exists,
 * so the pages can be reviewed. Every page that shows them carries a "sample" label.
 */
export const samplePrograms: Program[] = [
  {
    id: "sample-webinar",
    type: "webinar",
    title: { ko: "[예시] 미국 시장 진출 첫걸음 웨비나", en: "[Sample] First steps into the U.S. market" },
    summary: {
      ko: "예시 데이터입니다. 실제 강의는 Programs 시트에 입력하면 이 자리에 표시됩니다.",
      en: "Sample data. Real programs entered in the Programs sheet appear here instead.",
    },
    description: {
      ko: "예시 데이터입니다.\n실제 강의 설명은 Programs 시트의 description_ko 열에 입력합니다. 줄을 바꾸면 문단이 나뉩니다.",
      en: "Sample data.\nReal descriptions go in the description_en column of the Programs sheet. Line breaks become paragraphs.",
    },
    date: "2099-01-15",
    startTime: "17:00",
    endTime: "18:00",
    timezone: "PT",
    instructor: "Okkeun Lee",
    format: "Zoom",
    capacity: "50",
    registrationOpen: true,
  },
];
