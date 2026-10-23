import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { news } from "@/data/news";
import { alternatesFor, isLocale, localizedHref, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatProgramDate } from "@/lib/programs";

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
  const posts = [...news].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} accent="navy" />
      <SectionContainer>
        {posts.length === 0 ? (
          <p className="rounded-lg border border-dashed border-navy/25 p-8 text-center text-muted">{page.empty}</p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {posts.map((post) => (
              <li key={post.slug} className="py-8">
                <p className="text-sm font-semibold text-navy-600">{formatProgramDate(post.date, lang)}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-navy">
                  <Link href={localizedHref(lang, `/news/${post.slug}`)} className="hover:text-brand-blue">
                    {post.title[lang]}
                  </Link>
                </h2>
                <p className="mt-2 leading-relaxed text-muted">{post.summary[lang]}</p>
              </li>
            ))}
          </ul>
        )}
      </SectionContainer>
    </>
  );
}
