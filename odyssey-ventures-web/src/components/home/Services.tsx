import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface ServicesProps {
  lang: Locale;
  dict: Pick<Dictionary, "services" | "nav" | "common">;
}

export function Services({ lang, dict }: ServicesProps) {
  return (
    <SectionContainer id="services" tone="mist">
      <Reveal>
        <SectionHeading title={dict.services.title}>{dict.services.description}</SectionHeading>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={index * 100} className="h-full">
            <ServiceCard
              index={index}
              title={dict.nav[service.slug]}
              description={dict.services.cards[service.slug].description}
              linkLabel={dict.common.learnMore}
              href={localizedHref(lang, service.path)}
            />
          </Reveal>
        ))}
      </div>
    </SectionContainer>
  );
}
