import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PostEditor } from "@/components/newsroom/PostEditor";
import { Container } from "@/components/ui/Container";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPost } from "@/lib/newsroom";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getViewer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

interface EditorParams {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ slug?: string }>;
}

/** Staff-only: write a new post, or edit one with ?slug=. */
export default async function NewsEditorPage({ params, searchParams }: EditorParams) {
  const { lang } = await params;
  if (!isLocale(lang) || !isSupabaseConfigured) notFound();
  const { slug } = await searchParams;
  const viewer = await getViewer();
  if (!viewer) redirect(`${localizedHref(lang, "/login")}?next=${encodeURIComponent(`/${lang}/news/editor${slug ? `?slug=${slug}` : ""}`)}`);
  const page = getDictionary(lang).newsPage;
  const post = slug ? await getPost(slug) : null;
  if (slug && !post) notFound();

  return (
    <section className="bg-mist py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link href={localizedHref(lang, "/news")} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
          ← {page.back}
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-navy">{post ? page.editor.titleEdit : page.editor.titleNew}</h1>
        <div className="mt-8">
          {viewer.isStaff ? (
            <PostEditor lang={lang} dict={page.editor} post={post ?? undefined} />
          ) : (
            <p className="rounded-lg border border-line bg-white p-6 text-muted">{page.editor.staffOnly}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
