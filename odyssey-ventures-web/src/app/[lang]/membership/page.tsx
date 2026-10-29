import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contact } from "@/components/home/Contact";
import { PageHero } from "@/components/ui/PageHero";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { alternatesFor, isLocale, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.membership;
  return { title: page.title, description: page.description, alternates: alternatesFor(lang, "/membership") };
}

/**
 * Membership is not open yet: plans, prices and member features are still being decided,
 * so this page explains the idea and collects interest. It must not show prices until they are approved.
 */
export default async function MembershipPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.membershipPage;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} accent="blue" />

      <SectionContainer>
        <SectionHeading title={page.tiersTitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {page.tiers.map((tier, index) => (
            <article
              key={tier.title}
              className={
                index === 1
                  ? "rounded-lg border-2 border-brand-blue bg-brand-blue-tint/40 p-7"
                  : "rounded-lg border border-line bg-white p-7 shadow-card"
              }
            >
              <h3 className="text-xl font-semibold tracking-tight text-navy">{tier.title}</h3>
              <ul className="mt-5 space-y-2">
                {tier.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-navy">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionContainer>

      <Contact
        dict={dict.contact}
        lang={lang}
        title={page.contactTitle}
        description={page.contactDescription}
        defaultInterest="membership"
      />
    </>
  );
}
