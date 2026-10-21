import { ContactForm } from "@/components/home/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";

export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  return (
    <SectionContainer id="contact" tone="mist" containerClassName="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <SectionHeading title={dict.title}>{dict.description}</SectionHeading>

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
        <ContactForm dict={dict.form} />
      </Reveal>
    </SectionContainer>
  );
}
