"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import type { SubmissionKind } from "@/lib/submissions";

export type SubmissionStatus = "idle" | "sending" | "saved" | "emailFallback" | "error";

interface Options {
  kind: SubmissionKind;
  lang: string;
  /** Subject line used when the form falls back to the visitor's email app. */
  emailSubject: (fields: Record<string, string>) => string;
  /** Field labels for the fallback email body, in display order. */
  labels: Record<string, string>;
  /**
   * Runs before the form is sent, e.g. to upload attachments. Returns extra fields to send.
   * Throwing stops the submission and shows the error state.
   */
  prepare?: (data: FormData) => Promise<Record<string, string>>;
}

/**
 * Sends a form to /api/submit. If the site is not connected to the operations sheet yet (503),
 * it opens the visitor's email app with the same content, so no inquiry is lost.
 */
export function useSubmission({ kind, lang, emailSubject, labels, prepare }: Options) {
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const website = String(data.get("website") ?? "");
    data.delete("website");
    // Files are uploaded by `prepare`, never sent as text.
    const textFields = Object.fromEntries([...data.entries()].filter(([, value]) => typeof value === "string").map(([key, value]) => [key, String(value)]));

    setStatus("sending");
    try {
      const fields = prepare && !website ? { ...textFields, ...(await prepare(data)) } : textFields;
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, lang, page: window.location.pathname, fields, website }),
      });
      if (response.ok) {
        setStatus("saved");
        form.reset();
        return;
      }
      if (response.status === 503) {
        const body = Object.entries(labels)
          .map(([key, label]) => `${label}: ${fields[key] || "-"}`)
          .join("\n");
        window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(emailSubject(fields))}&body=${encodeURIComponent(body)}`;
        setStatus("emailFallback");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return { status, handleSubmit };
}
