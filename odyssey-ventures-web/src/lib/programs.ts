import { parseCsv } from "@/lib/csv";
import { programs as localPrograms, samplePrograms } from "@/data/programs";
import type { Locale } from "@/i18n/config";
import type { Program } from "@/types";

/** How long a fetched sheet is reused before the site reads it again. */
const REVALIDATE_SECONDS = 300;

function toProgram(row: Record<string, string>): Program | null {
  if (!row.id || !row.date || !row.title_ko) return null;
  if ((row.status ?? "").toLowerCase() !== "published") return null;
  return {
    id: row.id,
    type: row.type === "course" ? "course" : "webinar",
    title: { ko: row.title_ko, en: row.title_en || row.title_ko },
    summary: { ko: row.summary_ko ?? "", en: row.summary_en || row.summary_ko || "" },
    description: { ko: row.description_ko ?? "", en: row.description_en || row.description_ko || "" },
    date: row.date,
    startTime: row.start_time ?? "",
    endTime: row.end_time ?? "",
    timezone: row.timezone ?? "",
    instructor: row.instructor ?? "",
    format: row.format ?? "",
    capacity: row.capacity ?? "",
    registrationOpen: (row.registration_open ?? "").toUpperCase() !== "FALSE",
  };
}

async function fromSheet(url: string): Promise<Program[] | null> {
  try {
    const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!response.ok) return null;
    return parseCsv(await response.text())
      .map(toProgram)
      .filter((program): program is Program => program !== null);
  } catch {
    return null;
  }
}

export interface ProgramList {
  programs: Program[];
  /** True when the list is sample data shown outside production. Pages label it so it is never mistaken for real events. */
  isSample: boolean;
}

/**
 * Programs come from the "Programs" Google Sheet (PROGRAMS_CSV_URL), falling back to src/data/programs.ts.
 * When neither has anything and this is not the production site, sample programs are shown, clearly labeled.
 */
export async function getPrograms(): Promise<ProgramList> {
  const url = process.env.PROGRAMS_CSV_URL;
  const sheet = url ? await fromSheet(url) : null;
  const programs = sheet ?? localPrograms;
  if (programs.length > 0) return { programs: sortByDate(programs), isSample: false };
  if (process.env.VERCEL_ENV !== "production") return { programs: sortByDate(samplePrograms), isSample: true };
  return { programs: [], isSample: false };
}

export async function getProgram(id: string): Promise<{ program: Program; isSample: boolean } | null> {
  const { programs, isSample } = await getPrograms();
  const program = programs.find((item) => item.id === id);
  return program ? { program, isSample } : null;
}

function sortByDate(programs: Program[]): Program[] {
  return [...programs].sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));
}

/** A program is upcoming until the end of its date (compared as YYYY-MM-DD, so time zones cannot hide it early). */
export function isUpcoming(program: Program, today = new Date().toISOString().slice(0, 10)): boolean {
  return program.date >= today;
}

/** "2026년 11월 12일 (목)" or "Thu, Nov 12, 2026". Built from the date string itself, so no time-zone shift. */
export function formatProgramDate(date: string, lang: Locale): string {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;
  const utc = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: lang === "ko" ? "long" : "short",
    day: "numeric",
    weekday: "short",
    timeZone: "UTC",
  }).format(utc);
}

export function formatProgramTime(program: Program): string {
  const range = [program.startTime, program.endTime].filter(Boolean).join("–");
  return [range, program.timezone].filter(Boolean).join(" ");
}
