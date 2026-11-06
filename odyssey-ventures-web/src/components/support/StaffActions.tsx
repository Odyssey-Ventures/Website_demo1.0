"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { SupportStatus } from "@/lib/support-shared";

interface StaffActionsProps {
  lang: Locale;
  questionId: string;
  status: SupportStatus;
  dict: Dictionary["supportPage"]["detail"];
}

/** Close, reopen or delete a question. Only staff see these; the database allows them only for staff. */
export function StaffActions({ lang, questionId, status, dict }: StaffActionsProps) {
  const router = useRouter();
  const [failed, setFailed] = useState(false);
  const table = () => getSupabaseBrowserClient().from("support_questions");

  async function setStatus(next: SupportStatus) {
    const { error } = await table().update({ status: next }).eq("id", questionId);
    setFailed(!!error);
    if (!error) router.refresh();
  }

  async function remove() {
    if (!window.confirm(dict.confirmDelete)) return;
    const { error } = await table().delete().eq("id", questionId);
    setFailed(!!error);
    if (!error) {
      router.push(localizedHref(lang, "/support"));
      router.refresh();
    }
  }

  const buttonClass = "rounded-md border border-line px-3 py-1.5 text-sm font-medium text-navy hover:border-navy";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "closed" ? (
        <button type="button" className={buttonClass} onClick={() => setStatus("open")}>
          {dict.reopen}
        </button>
      ) : (
        <button type="button" className={buttonClass} onClick={() => setStatus("closed")}>
          {dict.close}
        </button>
      )}
      <button type="button" className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:border-red-700" onClick={remove}>
        {dict.delete}
      </button>
      {failed ? <span className="text-sm text-red-700">{dict.error}</span> : null}
    </div>
  );
}
