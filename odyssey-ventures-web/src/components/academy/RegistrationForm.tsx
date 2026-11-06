"use client";

import { Field, fieldClass, Honeypot, SubmitRow } from "@/components/forms/FormParts";
import { useSubmission } from "@/components/forms/useSubmission";
import type { Dictionary } from "@/i18n/dictionaries";

interface RegistrationFormProps {
  lang: string;
  dict: Dictionary["academyPage"]["register"];
  program: { id: string; title: string; date: string };
}

/** Academy registration. Saved to the "Registrations" sheet with the session id, title and date. */
export function RegistrationForm({ lang, dict, program }: RegistrationFormProps) {
  const { status, handleSubmit } = useSubmission({
    kind: "registration",
    lang,
    emailSubject: () => `${dict.subjectPrefix}: ${program.title} (${program.date})`,
    labels: { programTitle: "Program", programDate: "Date", name: dict.name, email: dict.email, company: dict.company, question: dict.question },
  });

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Honeypot />
      <input type="hidden" name="programId" value={program.id} />
      <input type="hidden" name="programTitle" value={program.title} />
      <input type="hidden" name="programDate" value={program.date} />
      <div className="grid gap-5">
        <Field label={dict.name}>
          <input name="name" type="text" required autoComplete="name" className={fieldClass} />
        </Field>
        <Field label={dict.email}>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </Field>
        <Field label={dict.company}>
          <input name="company" type="text" autoComplete="organization" className={fieldClass} />
        </Field>
        <Field label={dict.question}>
          <textarea name="question" rows={3} className={fieldClass} />
        </Field>
      </div>
      <SubmitRow status={status} messages={dict.status} />
    </form>
  );
}
