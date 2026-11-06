"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { fieldClass } from "@/components/forms/FormParts";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface ReplyFormProps {
  questionId: string;
  label: string;
  dict: Dictionary["supportPage"]["detail"];
}

/** Staff answer or customer follow-up. The database marks staff replies and updates the status. */
export function ReplyForm({ questionId, label, dict }: ReplyFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = String(new FormData(form).get("body") ?? "").trim();
    setStatus("sending");
    const { error } = await getSupabaseBrowserClient().from("support_replies").insert({ question_id: questionId, body });
    if (error) {
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("idle");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <label className="block text-sm font-medium text-navy">
        {label}
        <textarea name="body" required maxLength={5000} rows={5} className={fieldClass} />
      </label>
      <div className="mt-4 flex items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? dict.sending : dict.reply}
        </Button>
        {status === "error" ? <p className="text-sm text-red-700">{dict.error}</p> : null}
      </div>
    </form>
  );
}
