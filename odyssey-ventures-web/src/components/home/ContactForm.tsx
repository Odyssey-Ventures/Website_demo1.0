"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const interests = ["Academy", "Accelerator", "Advisory", "Something else"] as const;

const fieldClass =
  "mt-2 w-full rounded border border-line bg-white px-4 py-3 text-base text-navy placeholder:text-muted/70 transition-colors focus:border-navy-600";

/**
 * No backend yet: submitting opens the visitor's email app with the message
 * prepared. To store inquiries later, replace handleSubmit with a call to a
 * Next.js route handler that writes to Supabase (see README).
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const interest = String(data.get("interest") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `Inquiry: ${interest}${company ? ` (${company})` : ""}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "-"}`,
      `Interested in: ${interest}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy">
          Name
          <input name="name" type="text" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy">
          Email
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy">
          Company
          <input name="company" type="text" autoComplete="organization" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy">
          I am interested in
          <select name="interest" defaultValue={interests[0]} className={fieldClass}>
            {interests.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-navy">
        How can we help?
        <textarea name="message" required rows={5} className={fieldClass} />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit">Send by email</Button>
        <p className="text-sm text-muted" role="status">
          {sent
            ? "Your email app should now be open with your message. Press send there to finish."
            : "This opens your email app with your message ready to send."}
        </p>
      </div>
    </form>
  );
}
