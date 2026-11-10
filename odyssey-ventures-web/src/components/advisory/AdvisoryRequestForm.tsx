"use client";

import { useState, type ChangeEvent } from "react";
import { Field, fieldClass, Honeypot, SubmitRow } from "@/components/forms/FormParts";
import { useSubmission } from "@/components/forms/useSubmission";
import { advisorAreas, type AdvisorArea } from "@/data/advisor-profiles";
import type { Dictionary } from "@/i18n/dictionaries";
import { ADVISORY_FILE_ACCEPT, checkAdvisoryFiles, MAX_ADVISORY_FILES, saveAdvisoryRequest, type FileProblem } from "@/lib/advisory-requests";

interface AdvisoryRequestFormProps {
  lang: string;
  dict: Dictionary["advisoryRequest"];
  areas: Dictionary["advisors"]["areas"];
  /** Set on an advisor's page: the form asks for a meeting with that advisor. */
  advisor?: { name: string; area: AdvisorArea };
}

const stageKeys = ["idea", "seed", "seriesA", "growth", "corporate", "other"] as const;

/**
 * Startup Advisory request. Attachments go to the private Supabase bucket and the request is recorded in
 * advisory_requests (staff read both at /admin/advisory); the same request also goes to the "AdvisoryRequests"
 * sheet and the operator's email as before. An operator reviews it and matches an expert by hand.
 */
export function AdvisoryRequestForm({ lang, dict, areas, advisor }: AdvisoryRequestFormProps) {
  const [fileProblem, setFileProblem] = useState<FileProblem | null>(null);

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const problem = checkAdvisoryFiles([...(event.target.files ?? [])]);
    setFileProblem(problem);
    if (problem) event.target.value = "";
  }

  const { status, handleSubmit } = useSubmission({
    kind: "advisory",
    lang,
    emailSubject: (fields) => `${dict.subjectPrefix}: ${fields.preferredExpert || areas[fields.field as AdvisorArea] || dict.unsure}`,
    labels: {
      name: dict.name,
      email: dict.email,
      company: dict.company,
      stage: dict.stage,
      field: dict.field,
      preferredExpert: dict.preferredExpert,
      schedule: dict.schedule,
      request: dict.request,
    },
    prepare: async (data): Promise<Record<string, string>> => {
      const files = data.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0);
      if (checkAdvisoryFiles(files)) throw new Error("files");
      const id = crypto.randomUUID();
      const text = (key: string) => String(data.get(key) ?? "").trim();
      const fields = Object.fromEntries(
        ["name", "email", "company", "stage", "field", "preferredExpert", "schedule", "request"].map((key) => [key, text(key)])
      );
      try {
        const attachments = await saveAdvisoryRequest({ id, lang, fields, files });
        return { requestId: id, attachments: attachments.map((file) => file.name).join(", ") };
      } catch (error) {
        // Without files the request can still reach the sheet and the operator's email.
        if (files.length > 0) throw error;
        console.error("advisory request not recorded", error);
        return {};
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="relative rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={dict.name}>
          <input name="name" type="text" required autoComplete="name" className={fieldClass} />
        </Field>
        <Field label={dict.email}>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </Field>
        <Field label={dict.company}>
          <input name="company" type="text" autoComplete="organization" className={fieldClass} />
        </Field>
        <Field label={dict.stage}>
          <select name="stage" defaultValue="seed" className={fieldClass}>
            {stageKeys.map((key) => (
              <option key={key} value={key}>
                {dict.stages[key]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={dict.field}>
          <select name="field" required defaultValue={advisor?.area ?? "unsure"} className={fieldClass}>
            <option value="unsure">{dict.unsure}</option>
            {advisorAreas.map((key) => (
              <option key={key} value={key}>
                {areas[key]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={dict.preferredExpert}>
          <input name="preferredExpert" type="text" defaultValue={advisor?.name} className={fieldClass} />
        </Field>
      </div>

      <Field label={dict.request} className="mt-5">
        <textarea name="request" required rows={6} placeholder={dict.requestHint} className={fieldClass} />
      </Field>
      <Field label={dict.schedule} className="mt-5">
        <input name="schedule" type="text" className={fieldClass} />
      </Field>
      <Field label={dict.files} className="mt-5">
        <input
          name="attachments"
          type="file"
          multiple
          accept={ADVISORY_FILE_ACCEPT}
          onChange={handleFiles}
          className="block w-full text-sm text-muted file:mr-4 file:rounded-md file:border-0 file:bg-navy-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-navy hover:file:bg-navy-100"
        />
        <span className="mt-1 block text-xs font-normal text-muted">{dict.filesHint.replace("{max}", String(MAX_ADVISORY_FILES))}</span>
        {fileProblem ? (
          <span role="alert" className="mt-1 block text-xs font-medium text-red-700">
            {dict.fileProblems[fileProblem]}
          </span>
        ) : null}
      </Field>

      <SubmitRow status={status} messages={dict.status} />
    </form>
  );
}
