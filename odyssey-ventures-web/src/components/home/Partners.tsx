import { Container } from "@/components/ui/Container";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { partners } from "@/data/partners";
import type { Dictionary } from "@/i18n/dictionaries";

const PLACEHOLDER_SLOTS = 6;

/**
 * "Trusted Partners & Network": logo marquee right under the Hero. Logos come from src/data/partners.ts.
 * No logos yet: previews show labeled empty slots so the layout can be reviewed; production hides the section.
 */
export function Partners({ dict }: { dict: Dictionary["partners"] }) {
  const isPlaceholder = partners.length === 0 && process.env.VERCEL_ENV !== "production";
  if (partners.length === 0 && !isPlaceholder) return null;

  return (
    <section aria-labelledby="partners-title" className="border-b border-line bg-white py-12 sm:py-14">
      <Container className="flex flex-col items-center text-center">
        <h2 id="partners-title" className="text-sm font-semibold uppercase tracking-widest text-muted">
          {dict.title}
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">{dict.description}</p>
      </Container>

      <div className="mx-auto mt-8 max-w-content sm:px-8">
        {isPlaceholder ? (
          <div className="px-5 sm:px-0">
            <p className="mb-5 rounded-md bg-amber-50 px-4 py-3 text-left text-sm text-amber-900">{dict.placeholderNotice}</p>
            <ul aria-label={dict.listLabel} className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {Array.from({ length: PLACEHOLDER_SLOTS }, (_, index) => (
                <li
                  key={index}
                  className="flex h-12 items-center justify-center rounded-md border border-dashed border-navy/20 text-xs font-medium uppercase tracking-widest text-navy/35"
                >
                  {dict.placeholderSlot}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <LogoMarquee partners={partners} label={dict.listLabel} />
        )}
      </div>
    </section>
  );
}
