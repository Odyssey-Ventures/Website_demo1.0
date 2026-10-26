import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SupportCategory, SupportStatus } from "@/lib/support-shared";

export interface BoardRow {
  id: string;
  category: SupportCategory;
  status: SupportStatus;
  created_at: string;
  is_mine: boolean;
  /** Null unless the viewer wrote it or is staff. */
  title: string | null;
  total: number;
}

export interface SupportQuestion {
  id: string;
  author_id: string;
  author_email: string;
  category: SupportCategory;
  title: string;
  body: string;
  status: SupportStatus;
  created_at: string;
}

export interface SupportReply {
  id: string;
  author_id: string;
  author_email: string;
  from_staff: boolean;
  body: string;
  created_at: string;
}

export const BOARD_PAGE_SIZE = 20;

/** Every question as a row; titles only for the viewer's own questions (or all, for staff). */
export async function getBoard(page: number): Promise<BoardRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("support_board", { page_size: BOARD_PAGE_SIZE, page_offset: (page - 1) * BOARD_PAGE_SIZE });
  if (error) console.error("support_board", error.message);
  return (data as BoardRow[] | null) ?? [];
}

/** Null when the question does not exist or the viewer may not see it (the database decides). */
export async function getQuestion(id: string): Promise<SupportQuestion | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("support_questions").select("*").eq("id", id).maybeSingle();
  return (data as SupportQuestion | null) ?? null;
}

export async function listReplies(questionId: string): Promise<SupportReply[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("support_replies").select("*").eq("question_id", questionId).order("created_at");
  return (data as SupportReply[] | null) ?? [];
}
