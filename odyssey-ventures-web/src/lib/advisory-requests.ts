import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/** Private Storage bucket for Startup Advisory attachments (supabase/migrations/0005). */
export const ADVISORY_BUCKET = "advisory-files";
export const MAX_ADVISORY_FILES = 3;
export const MAX_ADVISORY_FILE_BYTES = 20 * 1024 * 1024;
/** Extensions offered in the file picker. The bucket also checks the file type on upload. */
export const ADVISORY_FILE_ACCEPT = ".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

export interface AdvisoryAttachment {
  path: string;
  name: string;
  size: number;
  type: string;
}

export type FileProblem = "tooMany" | "tooLarge" | "type";

/** Checks the picked files before anything is uploaded. */
export function checkAdvisoryFiles(files: File[]): FileProblem | null {
  if (files.length > MAX_ADVISORY_FILES) return "tooMany";
  if (files.some((file) => file.size > MAX_ADVISORY_FILE_BYTES)) return "tooLarge";
  if (files.some((file) => !ALLOWED_TYPES.has(file.type))) return "type";
  return null;
}

/** Keeps letters, numbers, dots, dashes and underscores so the Storage path stays valid. Korean names become "file". */
function safeName(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = dot > 0 ? name.slice(dot).toLowerCase().replace(/[^a-z0-9.]/g, "") : "";
  const base = (dot > 0 ? name.slice(0, dot) : name).replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  return `${base || "file"}${ext}`;
}

interface AdvisoryRequestRow {
  id: string;
  lang: string;
  fields: Record<string, string>;
  files: File[];
}

/**
 * Uploads the attachments to the private bucket, then records the request with links to them.
 * Visitors can add files and rows but never read them back; only staff can (see /admin/advisory).
 */
export async function saveAdvisoryRequest({ id, lang, fields, files }: AdvisoryRequestRow): Promise<AdvisoryAttachment[]> {
  const supabase = getSupabaseBrowserClient();
  const attachments: AdvisoryAttachment[] = [];
  for (const [index, file] of files.entries()) {
    const path = `requests/${id}/${index + 1}-${safeName(file.name)}`;
    const { error } = await supabase.storage.from(ADVISORY_BUCKET).upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw new Error(`upload: ${error.message}`);
    attachments.push({ path, name: file.name.slice(0, 200), size: file.size, type: file.type });
  }

  const { error } = await supabase.from("advisory_requests").insert({
    id,
    lang,
    name: fields.name ?? "",
    email: fields.email ?? "",
    company: fields.company ?? "",
    stage: fields.stage ?? "",
    field: fields.field ?? "",
    preferred_expert: fields.preferredExpert ?? "",
    schedule: fields.schedule ?? "",
    request: fields.request ?? "",
    attachments,
  });
  if (error) throw new Error(`insert: ${error.message}`);
  return attachments;
}
