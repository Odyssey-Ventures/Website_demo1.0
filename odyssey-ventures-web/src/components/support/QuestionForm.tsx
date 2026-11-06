"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Field, fieldClass } from "@/components/forms/FormParts";
import { Button } from "@/components/ui/Button";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { supportCategories } from "@/lib/support-shared";

interface QuestionFormProps {
  lang: Locale;
  dict: Dictionary["supportPage"];
  email: string;
}

/** Saves a private question, then tells staff through the usual inquiry e-mail (title and link only). */
export function QuestionForm({ lang, dict, email }: QuestionFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title") ?? "").trim();
    setStatus("sending");
    const { data: row, error } = await getSupabaseBrowserClient()
      .from("support_questions")
      .insert({ category: String(data.get("category")), title, body: String(data.get("body") ?? "").trim() })
      .select("id")
      .single();
    if (error || !row) {
      setStatus("error");
      return;
    }
    const link = `${window.location.origin}/${lang}/support/${row.id}`;
    // Best effort: the question is already saved even if this notification fails.
    void fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "inquiry",
        lang,
        page: `/${lang}/support/${row.id}`,
        fields: { name: email.split("@")[0], email, interest: "support", message: `${dict.notifySubject}: ${title}\n${link}` },
      }),
    }).catch(() => undefined);
    router.push(localizedHref(lang, `/support/${row.id}`));
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-5">
        <Field label={dict.form.category}>
          <select name="category" defaultValue="general" className={fieldClass}>
            {supportCategories.map((key) => (
              <option key={key} value={key}>
                {dict.categories[key]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={dict.form.subject}>
          <input name="title" required maxLength={150} className={fieldClass} />
        </Field>
        <Field label={dict.form.body}>
          <textarea name="body" required maxLength={5000} rows={8} className={fieldClass} />
        </Field>
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-muted">
        <span aria-hidden="true">🔒</span>
        {dict.form.privacyNote}
      </p>
      <div className="mt-6 flex items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? dict.form.sending : dict.form.submit}
        </Button>
        {status === "error" ? <p className="text-sm text-red-700">{dict.form.error}</p> : null}
      </div>
    </form>
  );
}
