/**
 * Everything a visitor can submit. Shared by the forms (browser) and /api/submit (server).
 * Each kind becomes one tab in the operations Google Sheet (see docs/operations.md).
 */
export const submissionKinds = {
  /** Academy lecture or webinar registration */
  registration: { sheet: "Registrations", required: ["name", "email", "programId"] },
  /** 1:1 Advisory request */
  advisory: { sheet: "AdvisoryRequests", required: ["name", "email", "field", "request"] },
  /** Contact, Consulting, Accelerator and Membership inquiries */
  inquiry: { sheet: "Inquiries", required: ["name", "email", "message"] },
} as const;

export type SubmissionKind = keyof typeof submissionKinds;

export interface SubmissionPayload {
  kind: SubmissionKind;
  lang: string;
  /** Page the form was sent from, for the operator's reference. */
  page: string;
  fields: Record<string, string>;
  /** Honeypot: hidden from people, filled in by most spam bots. Must stay empty. */
  website?: string;
}

const MAX_FIELD_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isSubmissionKind(value: unknown): value is SubmissionKind {
  return typeof value === "string" && value in submissionKinds;
}

/** Returns the cleaned fields, or the name of the first problem. */
export function validateFields(
  kind: SubmissionKind,
  fields: unknown
): { ok: true; fields: Record<string, string> } | { ok: false; error: string } {
  if (!fields || typeof fields !== "object") return { ok: false, error: "fields" };
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value !== "string" || key.length > 64) return { ok: false, error: key };
    clean[key] = value.trim().slice(0, MAX_FIELD_LENGTH);
  }
  for (const key of submissionKinds[kind].required) {
    if (!clean[key]) return { ok: false, error: key };
  }
  if (!EMAIL_PATTERN.test(clean.email)) return { ok: false, error: "email" };
  return { ok: true, fields: clean };
}
