import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contact } from "@/components/home/Contact";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { alternatesFor, isLocale, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.consulting;
  return {
    title: page.title,
    description: page.description,
    alternates: alternatesFor(lang, "/consulting"),
  };
}

/** Consulting: headline, why Odyssey, how we work, and a contact form preset to "Consulting". */
export default async function ConsultingPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.consultingPage;

  return (
    <>
      <section className="focus-dark relative isolate overflow-hidden bg-navy-950 text-white">
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-brand-blue/50 to-transparent blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-24 -z-10 h-[24rem] w-[24rem] rounded-full bg-gradient-to-tr from-brand-green/20 to-transparent blur-3xl"
        />
        <Container className="py-24 sm:py-28 md:py-36">
          <SectionHeading as="h1" size="lg" inverse eyebrow={page.eyebrow} title={page.title} className="max-w-4xl">
            {page.description}
          </SectionHeading>
          <Button href="#contact" variant="accent" className="mt-10">
            {page.primaryCta}
          </Button>
        </Container>
      </section>

      <SectionContainer>
        <Reveal>
          <SectionHeading title={page.whyTitle}>{page.whyDescription}</SectionHeading>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {page.why.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 100} className="flex h-full gap-5 rounded-lg border border-line bg-white p-7 shadow-card">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue-tint text-lg font-semibold text-brand-blue-dark"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-navy">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </SectionContainer>

      <SectionContainer tone="navy">
        <SectionHeading title={page.processTitle} inverse />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {page.process.map((step, index) => (
            <li key={step.title} className="border-t-2 border-brand-green pt-5">
              <p className="text-sm font-semibold tracking-widest text-brand-green">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-navy-100">{step.text}</p>
            </li>
          ))}
        </ol>
      </SectionContainer>

      <Contact
        dict={dict.contact}
        lang={lang}
        title={page.contactTitle}
        description={page.contactDescription}
        defaultInterest="consulting"
      />
    </>
  );
}
