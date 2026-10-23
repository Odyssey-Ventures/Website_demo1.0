import { ContactForm, type InterestKey } from "@/components/home/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";

interface ContactProps {
  dict: Dictionary["contact"];
  lang: string;
  /** Overrides the section heading, e.g. on a service page. */
  title?: string;
  description?: string;
  /** Interest preselected in the form. */
  defaultInterest?: InterestKey;
}

export function Contact({ dict, lang, title = dict.title, description = dict.description, defaultInterest }: ContactProps) {
  return (
    <SectionContainer id="contact" tone="mist" containerClassName="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <SectionHeading title={title}>{description}</SectionHeading>

        <dl className="mt-10 space-y-5">
          <div>
            <dt className="text-sm font-medium text-muted">{dict.emailLabel}</dt>
            <dd className="mt-1 text-lg">
              <a
                href={`mailto:${siteConfig.email}`}
                className="border-b border-brand-blue pb-0.5 text-navy transition-colors hover:text-brand-blue"
              >
                {siteConfig.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted">{dict.locationLabel}</dt>
            <dd className="mt-1 text-lg text-navy">{siteConfig.location}</dd>
          </div>
        </dl>
      </div>

      <Reveal className="lg:col-span-7" delay={120}>
        <ContactForm dict={dict.form} lang={lang} defaultInterest={defaultInterest} />
      </Reveal>
    </SectionContainer>
  );
}
