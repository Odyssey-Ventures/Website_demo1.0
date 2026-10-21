"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";

type ContactFormDict = Dictionary["contact"]["form"];

const interestKeys = ["academy", "accelerator", "advisory", "other"] as const;
type InterestKey = (typeof interestKeys)[number];

const fieldClass =
  "mt-2 w-full rounded-md border border-line bg-white px-4 py-3 text-base text-navy placeholder:text-muted/70 transition-colors focus:border-brand-blue";

/**
 * No backend yet: submitting opens the visitor's email app with the message
 * prepared. To store inquiries later, replace handleSubmit with a call to a
 * Next.js route handler that writes to Supabase (see README).
 */
export function ContactForm({ dict }: { dict: ContactFormDict }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const interestKey = String(data.get("interest") ?? interestKeys[0]) as InterestKey;
    const interest = dict.interests[interestKey] ?? interestKey;
    const message = String(data.get("message") ?? "");

    const subject = `${dict.subjectPrefix}: ${interest}${company ? ` (${company})` : ""}`;
    const body = [
      `${dict.name}: ${name}`,
      `${dict.email}: ${email}`,
      `${dict.company}: ${company || "-"}`,
      `${dict.interest}: ${interest}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy">
          {dict.name}
          <input name="name" type="text" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy">
          {dict.email}
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy">
          {dict.company}
          <input name="company" type="text" autoComplete="organization" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy">
          {dict.interest}
          <select name="interest" defaultValue={interestKeys[0]} className={fieldClass}>
            {interestKeys.map((key) => (
              <option key={key} value={key}>
                {dict.interests[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-navy">
        {dict.message}
        <textarea name="message" required rows={5} className={fieldClass} />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit">{dict.submit}</Button>
        <p className="text-sm text-muted" role="status">
          {sent ? dict.statusSent : dict.statusIdle}
        </p>
      </div>
    </form>
  );
}
