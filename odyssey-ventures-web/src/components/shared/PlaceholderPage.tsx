import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { PlaceholderSection } from "@/components/ui/PlaceholderSection";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactPath } from "@/config/navigation";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ServiceSlug } from "@/types";

interface PlaceholderPageProps {
  lang: Locale;
  slug: ServiceSlug;
  dict: Dictionary;
}

const accents = { academy: "blue", accelerator: "green", advisory: "navy" } as const;

/**
 * Shared body for Academy, Accelerator and Advisory:
 * banner, introduction, content section, additional section and contact call-to-action.
 * Real content replaces the text in src/messages/*.json; the layout stays the same.
 */
export function PlaceholderPage({ lang, slug, dict }: PlaceholderPageProps) {
  const page = dict.pages[slug];

  return (
    <>
      <PageHero
        eyebrow={dict.services.title}
        title={dict.nav[slug]}
        description={page.heroDescription}
        accent={accents[slug]}
      />

      <SectionContainer containerClassName="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading title={page.introTitle} />
        </Reveal>
        <Reveal className="lg:col-span-7" delay={120}>
          <p className="text-lg leading-relaxed text-muted">{page.introText}</p>
        </Reveal>
      </SectionContainer>

      <PlaceholderSection
        tone="mist"
        title={page.contentTitle}
        description={page.contentDescription}
        items={page.contentItems}
        badge={dict.common.placeholderTag}
        columns={3}
      />

      <PlaceholderSection
        title={page.additionalTitle}
        description={page.additionalDescription}
        items={page.additionalItems}
        badge={dict.common.placeholderTag}
        columns={2}
      />

      <SectionContainer
        tone="navy"
        containerClassName="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
      >
        <SectionHeading title={page.ctaTitle} inverse>
          {page.ctaDescription}
        </SectionHeading>
        <Button href={localizedHref(lang, contactPath)} variant="accent" className="shrink-0">
          {dict.common.contactUs}
        </Button>
      </SectionContainer>
    </>
  );
}
