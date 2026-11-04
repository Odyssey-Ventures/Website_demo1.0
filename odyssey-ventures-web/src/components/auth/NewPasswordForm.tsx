"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { MIN_PASSWORD_LENGTH } from "@/components/auth/authRedirect";
import { Field, fieldClass } from "@/components/forms/FormParts";
import { Button } from "@/components/ui/Button";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "saved" | "error" | "mismatch" | "short";

/** Shown after the password-reset link signs the person in: sets a new password for that account. */
export function NewPasswordForm({ dict, lang }: { dict: Dictionary["auth"]; lang: Locale }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    if (password.length < MIN_PASSWORD_LENGTH) return setStatus("short");
    if (password !== String(form.get("passwordConfirm") ?? "")) return setStatus("mismatch");
    setStatus("sending");
    const { error } = await getSupabaseBrowserClient().auth.updateUser({ password });
    setStatus(error ? "error" : "saved");
  }

  if (status === "saved") {
    return (
      <div>
        <p className="rounded-md bg-brand-blue-tint px-4 py-4 font-medium text-navy" role="status">
          {dict.passwordSaved}
        </p>
        <Link href={localizedHref(lang, "/")} className="mt-5 inline-block text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
          {dict.goHome} →
        </Link>
      </div>
    );
  }

  const message =
    status === "error" ? dict.passwordSaveError : status === "mismatch" ? dict.passwordMismatch : status === "short" ? dict.passwordTooShort : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label={dict.newPassword}>
        <input name="password" type="password" required minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" className={fieldClass} />
        <span className="mt-1.5 block text-xs font-normal text-muted">{dict.passwordHint}</span>
      </Field>
      <Field label={dict.passwordConfirm}>
        <input name="passwordConfirm" type="password" required minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" className={fieldClass} />
      </Field>
      <Button type="submit" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? dict.saving : dict.savePassword}
      </Button>
      {message ? (
        <p className="text-sm text-red-700" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
