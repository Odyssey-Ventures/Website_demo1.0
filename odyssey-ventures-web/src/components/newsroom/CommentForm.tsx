"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Field, fieldClass } from "@/components/forms/FormParts";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/** Signed-in visitors comment as themselves; the database rejects anything else. */
export function CommentForm({ postId, dict }: { postId: string; dict: Dictionary["newsPage"]["comments"] }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    const { error } = await getSupabaseBrowserClient()
      .from("news_comments")
      .insert({ post_id: postId, author_name: String(data.get("name") ?? "").trim(), body: String(data.get("body") ?? "").trim() });
    if (error) {
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("idle");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 rounded-lg border border-line bg-mist p-5">
      <Field label={dict.name}>
        <input name="name" type="text" required maxLength={50} autoComplete="name" className={fieldClass} />
      </Field>
      <Field label={dict.body} className="mt-4">
        <textarea name="body" required maxLength={2000} rows={3} className={fieldClass} />
      </Field>
      <div className="mt-4 flex items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? dict.sending : dict.submit}
        </Button>
        {status === "error" ? <p className="text-sm text-red-700">{dict.error}</p> : null}
      </div>
    </form>
  );
}
