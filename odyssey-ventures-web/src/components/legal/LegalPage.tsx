import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { EFFECTIVE_DATE, getLegalDocument } from "@/content/legal";
import { localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const isPreview = process.env.VERCEL_ENV !== "production";

/** Shared layout for /terms and /privacy. The text lives in src/content/legal.ts. */
export function LegalPage({ kind, lang }: { kind: "terms" | "privacy"; lang: Locale }) {
  const doc = getLegalDocument(kind, lang);
  const dict = getDictionary(lang).legal;
  const other = kind === "terms" ? { path: "/privacy", label: dict.otherPrivacy } : { path: "/terms", label: dict.otherTerms };

  return (
    <>
      <PageHero eyebrow={dict.eyebrow} title={doc.title} accent="navy" />
      <SectionContainer>
        <article className="mx-auto max-w-3xl">
          {isPreview ? (
            <p className="mb-8 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">{dict.draftNotice}</p>
          ) : null}
          <p className="text-sm font-medium text-muted">
            {dict.effective}: <time dateTime={EFFECTIVE_DATE}>{EFFECTIVE_DATE}</time>
          </p>
          <p className="mt-6 leading-relaxed text-navy">{doc.intro}</p>
          {doc.sections.map((section) => (
            <section key={section.title} className="mt-10">
              <h2 className="text-xl font-semibold text-navy">{section.title}</h2>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className="mt-3 whitespace-pre-line leading-relaxed text-muted [overflow-wrap:anywhere]">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <p className="mt-14 border-t border-line pt-6">
            <Link href={localizedHref(lang, other.path)} className="font-semibold text-brand-blue hover:underline">
              {other.label} →
            </Link>
          </p>
        </article>
      </SectionContainer>
    </>
  );
}
