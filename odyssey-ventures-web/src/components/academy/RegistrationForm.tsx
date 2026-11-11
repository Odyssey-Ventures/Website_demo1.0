"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ProgramStatus } from "@/components/academy/ProgramStatus";
import { Field, fieldClass, Honeypot } from "@/components/forms/FormParts";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { savePendingRegistration } from "@/lib/program-registrations";
import { cn } from "@/lib/utils";

interface RegistrationFormProps {
  lang: string;
  dict: Dictionary["academyPage"];
  program: {
    id: string;
    title: string;
    date: string;
    price?: string;
    paymentUrl?: string;
    capacity?: number;
    minParticipants?: number;
  };
}

type Status = "idle" | "sending" | "redirecting" | "saved" | "error";

/**
 * Academy registration: company, name and email, then straight to payment.
 * The registration is saved as pending (Supabase) and sent to the "Registrations" sheet; Stripe gets its id,
 * and the webhook marks it paid. Free programs (no payment link) just save the registration.
 */
export function RegistrationForm({ lang, dict, program }: RegistrationFormProps) {
  const form = dict.register;
  const [status, setStatus] = useState<Status>("idle");
  const [paid, setPaid] = useState(false);
  const [full, setFull] = useState(false);
  const capacity = program.capacity;
  const onCount = useCallback((count: number) => setFull(capacity !== undefined && count >= capacity), [capacity]);

  useEffect(() => {
    setPaid(new URLSearchParams(window.location.search).get("checkout") === "success");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get("website") ?? "")) return;
    const fields = {
      company: String(data.get("company") ?? "").trim(),
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
    };
    const id = crypto.randomUUID();
    setStatus("sending");

    const saved = await savePendingRegistration({ id, programId: program.id, ...fields });
    // The operations sheet gets a copy too, so the team sees every registration in one place.
    const sheet = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "registration",
        lang,
        page: window.location.pathname,
        fields: { programId: program.id, programTitle: program.title, programDate: program.date, registrationId: id, ...fields },
      }),
    })
      .then((response) => response.ok)
      .catch(() => false);

    if (!saved && !sheet) {
      setStatus("error");
      return;
    }
    if (!program.paymentUrl) {
      setStatus("saved");
      return;
    }
    const link = new URL(program.paymentUrl);
    if (link.hostname.endsWith("stripe.com")) {
      link.searchParams.set("client_reference_id", id);
      link.searchParams.set("prefilled_email", fields.email);
    }
    setStatus("redirecting");
    window.location.href = link.toString();
  }

  const isTest = program.paymentUrl?.includes("stripe.com/test_");
  const busy = status === "sending" || status === "redirecting";

  return (
    <div className="space-y-6">
      <ProgramStatus
        programId={program.id}
        capacity={capacity}
        minParticipants={program.minParticipants}
        dict={dict.status}
        onCount={onCount}
      />

      {paid ? (
        <p role="status" className="rounded-md bg-brand-green/20 px-4 py-3 text-sm font-medium text-navy">
          {form.paidNotice}
        </p>
      ) : full ? (
        <p className="text-muted">{dict.status.full}</p>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <Honeypot />
          <div className="grid gap-5">
            <Field label={form.company}>
              <input name="company" type="text" required autoComplete="organization" className={fieldClass} />
            </Field>
            <Field label={form.name}>
              <input name="name" type="text" required autoComplete="name" className={fieldClass} />
            </Field>
            <Field label={form.email}>
              <input name="email" type="email" required autoComplete="email" className={fieldClass} />
            </Field>
          </div>

          {program.price ? (
            <p className="mt-6 flex items-baseline justify-between border-t border-line pt-5">
              <span className="font-medium text-navy">{dict.payment.priceLabel}</span>
              <span className="text-2xl font-semibold tracking-tight text-navy">{program.price}</span>
            </p>
          ) : null}

          <Button type="submit" disabled={busy} className="mt-5 w-full">
            {busy ? form.status.sending : program.paymentUrl ? form.payAndRegister : form.status.submit}
          </Button>

          <p
            role="status"
            aria-live="polite"
            className={cn("mt-3 text-sm", status === "error" ? "text-red-700" : status === "saved" ? "font-medium text-navy" : "text-muted")}
          >
            {status === "error"
              ? `${form.status.error} ${siteConfig.email}`
              : status === "saved"
                ? form.status.saved
                : status === "redirecting"
                  ? form.redirecting
                  : program.paymentUrl
                    ? form.payNote
                    : ""}
          </p>
          {isTest ? <p className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">{dict.payment.testNotice}</p> : null}
        </form>
      )}
    </div>
  );
}
