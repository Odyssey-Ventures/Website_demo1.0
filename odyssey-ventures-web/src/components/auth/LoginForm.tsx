"use client";

import { useState, type FormEvent } from "react";
import { Field, fieldClass } from "@/components/forms/FormParts";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/** Emails a one-time sign-in link. Anyone can sign in; staff rights come only from a company address. */
export function LoginForm({ dict, next }: { dict: Dictionary["auth"]; next: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    setStatus("sending");
    const { error } = await getSupabaseBrowserClient().auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}` },
    });
    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return <p className="rounded-md bg-brand-blue-tint px-4 py-4 font-medium leading-relaxed text-navy">{dict.sent}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field label={dict.email}>
        <input name="email" type="email" required autoComplete="email" className={fieldClass} />
      </Field>
      <Button type="submit" className="mt-5 w-full" disabled={status === "sending"}>
        {status === "sending" ? dict.sending : dict.send}
      </Button>
      {status === "error" ? (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {dict.error}
        </p>
      ) : null}
    </form>
  );
}
