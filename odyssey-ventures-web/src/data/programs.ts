import type { Program } from "@/types";

/**
 * Programs normally live in the "Programs" Google Sheet (PROGRAMS_CSV_URL).
 * Anything added here is used only when the sheet is not connected.
 */
export const programs: Program[] = [];

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
