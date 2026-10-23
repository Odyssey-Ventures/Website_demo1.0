import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { news } from "@/data/news";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatProgramDate } from "@/lib/programs";

interface NewsParams {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: NewsParams): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = news.find((item) => item.slug === slug);
  if (!isLocale(lang) || !post) return {};
  return { title: post.title[lang], description: post.summary[lang] };
}

export default async function NewsPostPage({ params }: NewsParams) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const post = news.find((item) => item.slug === slug);
  if (!post) notFound();
  const page = getDictionary(lang).newsPage;

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link href={localizedHref(lang, "/news")} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
          ← {page.back}
        </Link>
        <p className="mt-8 text-sm font-semibold text-navy-600">{formatProgramDate(post.date, lang)}</p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight text-navy">{post.title[lang]}</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-navy">
          {post.body[lang]
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
        {post.externalUrl ? (
          <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="mt-10 inline-block font-medium text-brand-blue hover:text-brand-blue-dark">
            {page.external} ↗
          </a>
        ) : null}
      </Container>
    </article>
  );
}
