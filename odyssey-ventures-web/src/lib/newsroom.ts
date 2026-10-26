import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  external_url: string | null;
  published: boolean;
  author_email: string;
  created_at: string;
}

export interface NewsComment {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string;
  body: string;
  hidden: boolean;
  created_at: string;
}

/** Published posts, newest first. Staff also receive drafts (the database decides). */
export async function listPosts(): Promise<NewsPost[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("news_posts").select("*").order("created_at", { ascending: false }).limit(100);
  if (error) console.error("listPosts", error.message);
  return (data as NewsPost[] | null) ?? [];
}

export async function getPost(slug: string): Promise<NewsPost | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("news_posts").select("*").eq("slug", slug).maybeSingle();
  return (data as NewsPost | null) ?? null;
}

/** Visible comments; staff and each author also receive hidden ones (the database decides). */
export async function listComments(postId: string): Promise<NewsComment[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("news_comments").select("*").eq("post_id", postId).order("created_at");
  return (data as NewsComment[] | null) ?? [];
}

/** "2026년 10월 26일" / "Oct 26, 2026", in Pacific time where the company is based. */
export function formatPostDate(iso: string, lang: string): string {
  return new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: lang === "ko" ? "long" : "short",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(iso));
}

export function paragraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
}
