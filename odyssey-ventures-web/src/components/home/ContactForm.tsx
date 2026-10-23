"use client";

import { Field, fieldClass, Honeypot, SubmitRow } from "@/components/forms/FormParts";
import { useSubmission } from "@/components/forms/useSubmission";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactFormDict = Dictionary["contact"]["form"];

const interestKeys = ["consulting", "advisory", "academy", "accelerator", "membership", "other"] as const;
export type InterestKey = (typeof interestKeys)[number];

interface ContactFormProps {
  dict: ContactFormDict;
  lang: string;
  /** Interest preselected in the dropdown. */
  defaultInterest?: InterestKey;
}

/** General inquiry form (Contact, Consulting, Accelerator, Membership). Saved to the "Inquiries" sheet. */
export function ContactForm({ dict, lang, defaultInterest = "other" }: ContactFormProps) {
  const { status, handleSubmit } = useSubmission({
    kind: "inquiry",
    lang,
    emailSubject: (fields) => `${dict.subjectPrefix}: ${dict.interests[fields.interest as InterestKey] ?? fields.interest}`,
    labels: { name: dict.name, email: dict.email, company: dict.company, interest: dict.interest, message: dict.message },
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
        <Field label={dict.interest}>
          <select name="interest" defaultValue={defaultInterest} className={fieldClass}>
            {interestKeys.map((key) => (
              <option key={key} value={key}>
                {dict.interests[key]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={dict.message} className="mt-5">
        <textarea name="message" required rows={5} className={fieldClass} />
      </Field>

      <SubmitRow status={status} messages={dict.status} />
    </form>
  );
}
