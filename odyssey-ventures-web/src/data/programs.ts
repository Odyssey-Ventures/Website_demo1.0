import type { Program } from "@/types";

/**
 * Programs normally live in the "Programs" Google Sheet (PROGRAMS_CSV_URL).
 * Anything added here is used only when the sheet is not connected.
 */
export const programs: Program[] = [
  {
    id: "us-market-webinar-2026-12",
    type: "webinar",
    title: {
      ko: "미국 시장 진출 첫걸음: 실리콘밸리 Go-To-Market 웨비나",
      en: "First steps into the U.S. market: a Silicon Valley go-to-market webinar",
    },
    summary: {
      ko: "미국 진출을 준비하는 스타트업과 기업을 위해, 실리콘밸리 현지 시장 진입 전략의 기본을 짚어 드립니다.",
      en: "For startups and companies preparing to enter the U.S., the basics of a Silicon Valley go-to-market strategy.",
    },
    description: {
      ko: "미국 시장 진출을 준비할 때 가장 먼저 점검해야 할 것들을 실리콘밸리 현장의 시각으로 정리합니다.\n강의 후 질의응답 시간이 있습니다.",
      en: "What to check first when preparing for the U.S. market, from a Silicon Valley point of view.\nA Q&A follows the talk.",
    },
    date: "2026-12-10",
    startTime: "17:00",
    endTime: "18:00",
    timezone: "PT",
    instructor: "Okkeun Lee",
    format: "Zoom",
    capacity: "50",
    minParticipants: 10,
    registrationOpen: true,
    price: "$20",
    // Stripe test mode (sandbox) for now: no real charge. Replace with a live Payment Link before taking real payments.
    paymentUrl: "https://buy.stripe.com/test_aFadRb9hc86B9eV3Tb2wU03",
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
    // Stripe test mode (sandbox): no real charge. Pay with card 4242 4242 4242 4242.
    price: "$20",
    paymentUrl: "https://buy.stripe.com/test_aFa8wR1OKfz3gHn61j2wU02",
    minParticipants: 10,
  },
];
