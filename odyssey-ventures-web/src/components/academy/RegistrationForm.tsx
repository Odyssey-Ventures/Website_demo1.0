"use client";

import { Field, fieldClass, Honeypot, SubmitRow } from "@/components/forms/FormParts";
import { useSubmission } from "@/components/forms/useSubmission";
import { academyPaymentHref } from "@/config/payments";
import type { Dictionary } from "@/i18n/dictionaries";

interface RegistrationFormProps {
  lang: string;
  dict: Dictionary["academyPage"]["register"];
  program: { id: string; title: string; date: string };
  /** Formatted fee, e.g. "20,000원". Missing for free sessions. */
  price?: string;
  /** Payment page opened after a paid registration is saved. */
  paymentUrl?: string;
}

/**
 * Academy registration. Saved to the "Registrations" sheet with the session id, title and date.
 * For a paid session with a payment link, the visitor is sent on to the payment page (e.g. Stripe) once it is saved.
 */
export function RegistrationForm({ lang, dict, program, price, paymentUrl }: RegistrationFormProps) {
  const { status, handleSubmit } = useSubmission({
    kind: "registration",
    lang,
    emailSubject: () => `${dict.subjectPrefix}: ${program.title} (${program.date})`,
    labels: { programTitle: "Program", programDate: "Date", name: dict.name, email: dict.email, company: dict.company, question: dict.question },
    afterSubmit: paymentUrl
      ? (fields) => {
          window.location.href = academyPaymentHref(paymentUrl, program.id, fields.email);
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Honeypot />
      <input type="hidden" name="programId" value={program.id} />
      <input type="hidden" name="programTitle" value={program.title} />
      <input type="hidden" name="programDate" value={program.date} />
      {price ? <input type="hidden" name="price" value={price} /> : null}
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

      {price ? (
        <div className="mt-6 flex items-baseline justify-between border-t border-line pt-5">
          <span className="font-semibold text-navy">{dict.fee}</span>
          <span className="text-2xl font-semibold tracking-tight text-navy">{price}</span>
        </div>
      ) : null}

      <SubmitRow status={status} messages={paymentUrl ? { ...dict.status, saved: dict.payment.redirecting } : dict.status} />
      {price ? <p className="mt-3 text-sm leading-relaxed text-muted">{paymentUrl ? dict.payment.note : dict.payment.pendingNote}</p> : null}
    </form>
  );
}
