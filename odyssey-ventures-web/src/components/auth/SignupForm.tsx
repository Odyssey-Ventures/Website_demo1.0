"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { authCallbackUrl, MIN_PASSWORD_LENGTH } from "@/components/auth/authRedirect";
import { Field, fieldClass } from "@/components/forms/FormParts";
import { Button } from "@/components/ui/Button";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "sent" | "error" | "mismatch" | "short";

/** Email + password sign-up. Supabase emails a confirmation link; the account works once it is opened. */
export function SignupForm({ dict, next, lang }: { dict: Dictionary["auth"]; next: string; lang: Locale }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    if (password.length < MIN_PASSWORD_LENGTH) return setStatus("short");
    if (password !== String(form.get("passwordConfirm") ?? "")) return setStatus("mismatch");

    setStatus("sending");
    const { error } = await getSupabaseBrowserClient().auth.signUp({
      email: String(form.get("email") ?? "").trim(),
      password,
      options: {
        // Display name only. Never used for permissions (user metadata is editable by the user).
        data: { full_name: String(form.get("name") ?? "").trim().slice(0, 50) },
        emailRedirectTo: authCallbackUrl(next),
      },
    });
    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <p className="rounded-md bg-brand-blue-tint px-4 py-4 font-medium leading-relaxed text-navy" role="status">
        {dict.signupSent}
      </p>
    );
  }

  const message =
    status === "error" ? dict.signupError : status === "mismatch" ? dict.passwordMismatch : status === "short" ? dict.passwordTooShort : null;

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label={dict.name}>
          <input name="name" type="text" required maxLength={50} autoComplete="name" className={fieldClass} />
        </Field>
        <Field label={dict.email}>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </Field>
        <Field label={dict.password}>
          <input
            name="password"
            type="password"
            required
            minLength={MIN_PASSWORD_LENGTH}
            autoComplete="new-password"
            aria-describedby="password-hint"
            className={fieldClass}
          />
          <span id="password-hint" className="mt-1.5 block text-xs font-normal text-muted">
            {dict.passwordHint}
          </span>
        </Field>
        <Field label={dict.passwordConfirm}>
          <input name="passwordConfirm" type="password" required minLength={MIN_PASSWORD_LENGTH} autoComplete="new-password" className={fieldClass} />
        </Field>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-navy">
          <input name="agree" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-brand-blue" />
          <span>
            {dict.agree.split(/(\{terms\}|\{privacy\})/).map((part, i) =>
              part === "{terms}" || part === "{privacy}" ? (
                <Link
                  key={i}
                  href={localizedHref(lang, part === "{terms}" ? "/terms" : "/privacy")}
                  target="_blank"
                  className="font-semibold text-brand-blue underline-offset-2 hover:underline"
                >
                  {part === "{terms}" ? dict.termsLink : dict.privacyLink}
                </Link>
              ) : (
                part
              )
            )}
          </span>
        </label>
        <Button type="submit" className="w-full" disabled={status === "sending"}>
          {status === "sending" ? dict.creating : dict.createAccount}
        </Button>
        {message ? (
          <p className="text-sm text-red-700" role="alert">
            {message}
          </p>
        ) : null}
      </form>
      <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
        {dict.haveAccount}{" "}
        <Link href={`${localizedHref(lang, "/login")}?next=${encodeURIComponent(next)}`} className="font-medium text-brand-blue hover:text-brand-blue-dark">
          {dict.login}
        </Link>
      </p>
    </div>
  );
}
