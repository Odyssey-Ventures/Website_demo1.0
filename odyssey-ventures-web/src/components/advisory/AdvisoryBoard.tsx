import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { advisorCategories, advisors, localize, type AdvisorGroup } from "@/data/advisors";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface AdvisoryBoardProps {
  lang: Locale;
  dict: Dictionary["advisoryBoard"];
}

const groups: AdvisorGroup[] = ["business", "tech"];

/**
 * Advisory board list grouped by field. Each card is a native <details> element,
 * so tapping (or Enter/Space) opens the advisor's expertise without any client JavaScript.
 */
export function AdvisoryBoard({ lang, dict }: AdvisoryBoardProps) {
  return (
    <SectionContainer id="advisory-board" tone="mist">
      <Reveal>
        <SectionHeading title={dict.title}>{dict.description}</SectionHeading>
      </Reveal>

      <nav aria-label={dict.jump} className="mt-10">
        <ul className="flex flex-wrap gap-2">
          {advisorCategories.map(({ key }) => (
            <li key={key}>
              <a
                href={`#advisors-${key}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:border-navy hover:text-navy"
              >
                {dict.categories[key]}
                <span className="text-xs text-muted/70">{advisors[key].length}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">{dict.hint}</p>
      </nav>

      {groups.map((group) => (
        <div key={group} className="mt-16">
          <h3 className="text-2xl font-semibold tracking-tight text-navy">{dict.groups[group].title}</h3>

          {advisorCategories
            .filter((category) => category.group === group)
            .map(({ key }) => (
              <div key={key} id={`advisors-${key}`} className="mt-10 scroll-mt-24 md:scroll-mt-28">
                <h4 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">
                  <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-green" />
                  {dict.categories[key]}
                </h4>
                <ul className="mt-4 grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {advisors[key].map((advisor, index) => {
                    const specialty = advisor.specialty ? localize(advisor.specialty, lang) : dict.noSpecialty;
                    return (
                      <li key={index}>
                        <details className="group rounded-lg border border-line bg-white shadow-card transition-shadow duration-200 open:shadow-card-hover">
                          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                            <span>
                              <span className="block text-lg font-semibold text-navy">{localize(advisor.org, lang)}</span>
                              <span className="mt-0.5 block text-muted">{localize(advisor.title, lang)}</span>
                            </span>
                            <svg
                              aria-hidden="true"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              className="mt-1 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                            >
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                          </summary>
                          <dl className="mx-5 grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 border-t border-line pb-5 pt-4 text-sm">
                            <dt className="font-medium text-navy">{dict.field}</dt>
                            <dd className="text-muted">{dict.categories[key]}</dd>
                            <dt className="font-medium text-navy">{dict.specialty}</dt>
                            <dd className="text-muted">{specialty}</dd>
                          </dl>
                        </details>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

          <p className="mt-8 text-sm italic text-muted">{dict.groups[group].note}</p>
        </div>
      ))}
    </SectionContainer>
  );
}
