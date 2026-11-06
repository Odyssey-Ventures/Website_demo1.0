"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authCallbackUrl } from "@/components/auth/authRedirect";
import { Field, fieldClass } from "@/components/forms/FormParts";
import { Button } from "@/components/ui/Button";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type Mode = "password" | "link" | "reset";
type Status = "idle" | "sending" | "sent" | "error";

/**
 * Sign in with email + password, or with a one-time emailed link, or request a password-reset link.
 * Anyone can sign in; staff rights come only from a company address (enforced by the database).
 */
export function LoginForm({ dict, next, lang }: { dict: Dictionary["auth"]; next: string; lang: Locale }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("password");
  const [status, setStatus] = useState<Status>("idle");

  function switchMode(value: Mode) {
    setMode(value);
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const supabase = getSupabaseBrowserClient();
    setStatus("sending");

    if (mode === "password") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: String(form.get("password") ?? "") });
      if (error) return setStatus("error");
      router.replace(next);
      router.refresh();
      return;
    }
    const { error } =
      mode === "link"
        ? await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: authCallbackUrl(next), shouldCreateUser: false } })
        : await supabase.auth.resetPasswordForEmail(email, { redirectTo: authCallbackUrl(localizedHref(lang, "/reset-password")) });
    setStatus(error ? "error" : "sent");
  }

  if (status === "sent") {
    return (
      <div>
        <p className="rounded-md bg-brand-blue-tint px-4 py-4 font-medium leading-relaxed text-navy" role="status">
          {mode === "reset" ? dict.resetSent : dict.sent}
        </p>
        <button type="button" onClick={() => switchMode("password")} className="mt-5 text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
          ← {dict.backToLogin}
        </button>
      </div>
    );
  }

  const errorText = mode === "password" ? dict.signInError : dict.error;
  const submitLabel = mode === "password" ? dict.signIn : mode === "link" ? dict.send : dict.resetSend;

  return (
    <div>
      {mode === "reset" ? (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-navy">{dict.resetTitle}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">{dict.resetDescription}</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label={dict.email}>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </Field>
        {mode === "password" ? (
          <Field label={dict.password}>
            <input name="password" type="password" required autoComplete="current-password" className={fieldClass} />
          </Field>
        ) : null}
        {mode === "password" ? (
          <p className="-mt-2 text-right text-sm">
            <button type="button" onClick={() => switchMode("reset")} className="font-medium text-muted hover:text-navy">
              {dict.forgot}
            </button>
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={status === "sending"}>
          {status === "sending" ? (mode === "password" ? dict.signingIn : dict.sending) : submitLabel}
        </Button>
        {status === "error" ? (
          <p className="text-sm text-red-700" role="alert">
            {errorText}
          </p>
        ) : null}
      </form>

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 text-sm">
        {mode === "password" ? (
          <button type="button" onClick={() => switchMode("link")} className="text-left font-medium text-brand-blue hover:text-brand-blue-dark">
            {dict.useLink}
          </button>
        ) : (
          <button type="button" onClick={() => switchMode("password")} className="text-left font-medium text-brand-blue hover:text-brand-blue-dark">
            {mode === "reset" ? `← ${dict.backToLogin}` : dict.usePassword}
          </button>
        )}
        <p className="text-muted">
          {dict.noAccount}{" "}
          <Link href={`${localizedHref(lang, "/signup")}?next=${encodeURIComponent(next)}`} className="font-medium text-brand-blue hover:text-brand-blue-dark">
            {dict.signup}
          </Link>
        </p>
      </div>
    </div>
  );
}
