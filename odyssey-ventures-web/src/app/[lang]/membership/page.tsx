import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contact } from "@/components/home/Contact";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isMembershipTier, membershipCheckoutHref, membershipPaymentUrl, type MembershipTier } from "@/config/membership";
import { alternatesFor, isLocale, localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { createSupabaseServerClient, getViewer } from "@/lib/supabase/server";

interface MembershipParams {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ checkout?: string }>;
}

export async function generateMetadata({ params }: MembershipParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.membership;
  return { title: page.title, description: page.description, alternates: alternatesFor(lang, "/membership") };
}

const isPreview = process.env.VERCEL_ENV !== "production";

/** The visitor's current plan. Rows are written only by the Stripe webhook; no row means Free. */
async function currentTier(userId: string): Promise<MembershipTier> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("memberships").select("tier, status").eq("user_id", userId).maybeSingle();
  return data && data.status !== "canceled" && isMembershipTier(data.tier) ? data.tier : "free";
}

export default async function MembershipPage({ params, searchParams }: MembershipParams) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) notFound();
  const lang: Locale = rawLang;
  const dict = getDictionary(lang);
  const page = dict.membershipPage;
  const justPaid = (await searchParams).checkout === "success";
  const viewer = await getViewer();
  const tier = viewer ? await currentTier(viewer.id) : null;
  const loginHref = `${localizedHref(lang, "/login")}?next=${encodeURIComponent(`/${lang}/membership`)}`;

  function action(id: MembershipTier) {
    if (tier === id) return <p className="rounded-md border border-line py-3 text-center font-medium text-muted">{page.current}</p>;
    if (id === "free") {
      return viewer ? null : (
        <Button href={localizedHref(lang, "/signup")} variant="secondary" className="w-full">
          {page.cta.free}
        </Button>
      );
    }
    if (id === "enterprise") {
      return (
        <Button href="#contact" variant="secondary" className="w-full">
          {page.cta.enterprise}
        </Button>
      );
    }
    const url = membershipPaymentUrl(id);
    if (!url) return <p className="rounded-md bg-mist py-3 text-center text-sm text-muted">{page.cta.soon}</p>;
    if (!viewer) {
      return (
        <Button href={loginHref} className="w-full">
          {page.cta.signInToSubscribe}
        </Button>
      );
    }
    return (
      <a
        href={membershipCheckoutHref(url, viewer.id, viewer.email)}
        className="inline-flex w-full items-center justify-center rounded-md bg-brand-blue px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-brand-blue-dark"
      >
        {page.cta.subscribe}
      </a>
    );
  }

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} accent="blue" />

      <SectionContainer>
        {justPaid ? (
          <div role="status" className="mb-10 rounded-lg border border-brand-green bg-brand-green/10 p-5">
            <p className="font-semibold text-navy">{page.successTitle}</p>
            <p className="mt-1 text-sm text-navy">{page.successText}</p>
          </div>
        ) : null}
        <SectionHeading title={page.tiersTitle} />
        {isPreview ? <p className="mt-4 text-sm text-muted">{page.testNotice}</p> : null}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {page.tiers.map((plan) => {
            const id = plan.id as MembershipTier;
            const featured = id === "pro";
            const paid = id === "basic" || id === "pro";
            return (
              <article
                key={id}
                className={cn(
                  "relative flex flex-col rounded-lg bg-white p-7",
                  featured ? "border-2 border-brand-blue shadow-card-hover" : "border border-line shadow-card",
                  tier === id && "ring-2 ring-brand-green"
                )}
              >
                {featured ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white">{page.popular}</span>
                ) : null}
                <h3 className="text-xl font-semibold tracking-tight text-navy">{plan.name}</h3>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-muted">{plan.summary}</p>
                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold tracking-tight text-navy">{plan.price}</span>
                  {paid ? <span className="text-sm text-muted">{page.perMonth}</span> : null}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-navy">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">{action(id)}</div>
              </article>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-muted">{page.manageNote}</p>
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
