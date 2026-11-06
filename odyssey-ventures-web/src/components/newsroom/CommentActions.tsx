"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface CommentActionsProps {
  commentId: string;
  hidden: boolean;
  /** Staff may hide, unhide and delete any comment. */
  canModerate: boolean;
  /** Authors may delete their own comment. */
  canDelete: boolean;
  dict: Dictionary["newsPage"]["comments"];
}

export function CommentActions({ commentId, hidden, canModerate, canDelete, dict }: CommentActionsProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function run(action: () => PromiseLike<{ error: unknown }>) {
    setBusy(true);
    setFailed(false);
    const { error } = await action();
    setBusy(false);
    if (error) setFailed(true);
    else router.refresh();
  }

  const table = () => getSupabaseBrowserClient().from("news_comments");
  const buttonClass = "font-medium text-muted transition-colors hover:text-navy disabled:opacity-50";

  return (
    <div className="flex items-center gap-4 text-xs">
      {canModerate ? (
        <button type="button" disabled={busy} className={buttonClass} onClick={() => run(() => table().update({ hidden: !hidden }).eq("id", commentId))}>
          {hidden ? dict.unhide : dict.hide}
        </button>
      ) : null}
      {canModerate || canDelete ? (
        <button
          type="button"
          disabled={busy}
          className={buttonClass}
          onClick={() => {
            if (window.confirm(dict.confirmDelete)) run(() => table().delete().eq("id", commentId));
          }}
        >
          {dict.delete}
        </button>
      ) : null}
      {failed ? <span className="text-red-700">{dict.error}</span> : null}
    </div>
  );
}
