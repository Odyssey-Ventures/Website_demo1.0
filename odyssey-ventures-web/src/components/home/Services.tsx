import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { servicePhotos } from "@/config/photos";
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
              media={
                <>
                  <Image
                    src={servicePhotos[service.slug].src}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/25 to-transparent" />
                  <span aria-hidden="true" className="absolute bottom-4 left-6 text-4xl font-semibold tracking-tight text-white/90">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </>
              }
            />
          </Reveal>
        ))}
      </div>
    </SectionContainer>
  );
}
