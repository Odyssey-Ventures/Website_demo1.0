"use client";

import { Field, fieldClass, Honeypot, SubmitRow } from "@/components/forms/FormParts";
import { useSubmission } from "@/components/forms/useSubmission";
import { advisorCategories } from "@/data/advisors";
import type { Dictionary } from "@/i18n/dictionaries";

interface AdvisoryRequestFormProps {
  lang: string;
  dict: Dictionary["advisoryRequest"];
  categories: Dictionary["advisoryBoard"]["categories"];
}

const stageKeys = ["idea", "seed", "seriesA", "growth", "corporate", "other"] as const;

/** 1:1 Advisory request. Saved to the "AdvisoryRequests" sheet; an operator reviews it and matches an expert by hand. */
export function AdvisoryRequestForm({ lang, dict, categories }: AdvisoryRequestFormProps) {
  const { status, handleSubmit } = useSubmission({
    kind: "advisory",
    lang,
    emailSubject: (fields) => `${dict.subjectPrefix}: ${categories[fields.field as keyof typeof categories] ?? dict.unsure}`,
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
          <select name="field" required defaultValue="unsure" className={fieldClass}>
            <option value="unsure">{dict.unsure}</option>
            {advisorCategories.map(({ key }) => (
              <option key={key} value={key}>
                {categories[key]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={dict.preferredExpert}>
          <input name="preferredExpert" type="text" className={fieldClass} />
        </Field>
      </div>

      <Field label={dict.request} className="mt-5">
        <textarea name="request" required rows={6} placeholder={dict.requestHint} className={fieldClass} />
      </Field>
      <Field label={dict.schedule} className="mt-5">
        <input name="schedule" type="text" className={fieldClass} />
      </Field>

      <SubmitRow status={status} messages={dict.status} />
    </form>
  );
}
