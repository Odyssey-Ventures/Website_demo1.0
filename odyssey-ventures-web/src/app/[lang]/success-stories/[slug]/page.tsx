import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { successStories } from "@/data/success-stories";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface StoryParams {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  return successStories.flatMap((story) => [{ lang: "ko", slug: story.slug }, { lang: "en", slug: story.slug }]);
}

export async function generateMetadata({ params }: StoryParams): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const story = successStories.find((item) => item.slug === slug);
  if (!story) return {};
  return {
    title: story.company,
    description: story.program[lang],
    alternates: {
      canonical: `/${lang}/success-stories/${slug}`,
      languages: { en: `/en/success-stories/${slug}`, ko: `/ko/success-stories/${slug}` },
    },
  };
}

/** One success story from src/data/success-stories.ts. */
export default async function SuccessStoryPage({ params }: StoryParams) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const story = successStories.find((item) => item.slug === slug);
  if (!story) notFound();
  const dict = getDictionary(lang).successStories;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Link href={localizedHref(lang, "/")} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
          ← {dict.back}
        </Link>

        <div className="mt-8 flex items-center gap-5">
          {story.logoSrc ? (
            <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-md border border-line bg-white p-2">
              <Image src={story.logoSrc} alt="" width={56} height={56} className="h-full w-full object-contain" />
            </span>
          ) : null}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">{dict.eyebrow}</p>
            <h1 className="mt-1 text-3xl font-semibold leading-tight tracking-tight text-navy sm:text-4xl">{story.company}</h1>
          </div>
        </div>

        {story.imageSrc ? (
          <Image
            src={story.imageSrc}
            alt=""
            width={1200}
            height={675}
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="mt-10 aspect-[16/9] w-full rounded-lg object-cover"
          />
        ) : null}

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <dl className="space-y-6 lg:col-span-4">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-widest text-brand-blue">{dict.programLabel}</dt>
              <dd className="mt-1 text-navy">
                {story.program[lang]}
                {story.year ? <span className="text-muted"> · {story.year}</span> : null}
              </dd>
            </div>
            {story.support.length > 0 ? (
              <div>
                <dt className="text-sm font-semibold uppercase tracking-widest text-brand-blue">{dict.supportLabel}</dt>
                {story.support.map((item) => (
                  <dd key={item[lang]} className="mt-1 text-navy">
                    {item[lang]}
                  </dd>
                ))}
              </div>
            ) : null}
            {story.outcomes.length > 0 ? (
              <div>
                <dt className="text-sm font-semibold uppercase tracking-widest text-brand-blue">{dict.outcomesLabel}</dt>
                {story.outcomes.map((item) => (
                  <dd key={item[lang]} className="mt-1 text-navy">
                    {item[lang]}
                  </dd>
                ))}
              </div>
            ) : null}
          </dl>
          {story.body ? (
            <div className="space-y-4 text-lg leading-relaxed text-navy lg:col-span-8">
              {story.body[lang].split(/\n+/).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
