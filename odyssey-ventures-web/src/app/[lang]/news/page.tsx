import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { alternatesFor, isLocale, localizedHref, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatPostDate, listPosts } from "@/lib/newsroom";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getViewer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.news;
  return { title: page.title, description: page.description, alternates: alternatesFor(lang, "/news") };
}

export default async function NewsPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const page = getDictionary(lang).newsPage;
  const viewer = await getViewer();
  const posts = isSupabaseConfigured ? await listPosts() : [];

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} accent="navy" />
      <SectionContainer>
        {viewer?.isStaff ? (
          <div className="mb-8 flex justify-end">
            <Button href={localizedHref(lang, "/news/editor")}>{page.write}</Button>
          </div>
        ) : null}
        {!isSupabaseConfigured ? (
          <p className="rounded-lg border border-dashed border-navy/25 p-8 text-center text-muted">{page.notConfigured}</p>
        ) : posts.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy/25 p-8 text-center text-muted">{page.empty}</p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {posts.map((post) => (
              <li key={post.id} className="py-8">
                <p className="flex items-center gap-3 text-sm font-semibold text-navy-600">
                  {formatPostDate(post.created_at, lang)}
                  {!post.published ? <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-900">{page.draft}</span> : null}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-navy">
                  <Link href={localizedHref(lang, `/news/${post.slug}`)} className="hover:text-brand-blue">
                    {post.title}
                  </Link>
                </h2>
                {post.summary ? <p className="mt-2 leading-relaxed text-muted">{post.summary}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </SectionContainer>
    </>
  );
}
