import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import type { Dictionary } from "@/i18n/dictionaries";

/** Key figures from the company profile. */
export function Highlights({ dict }: { dict: Dictionary["highlights"] }) {
  return (
    <SectionContainer tone="navy">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-green">{dict.title}</h2>
      <dl className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {dict.items.map((item, index) => (
          <Reveal key={item.label} delay={index * 100}>
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <span className="block text-5xl font-semibold tracking-tight text-white">{item.value}</span>
              <span className="mt-3 block leading-relaxed text-navy-100">{item.label}</span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </SectionContainer>
  );
}
