import Image from "next/image";
import type { Partner } from "@/types";

interface LogoMarqueeProps {
  partners: Partner[];
  /** Accessible name for the list. */
  label: string;
  /** Seconds for one full loop. Scales with the number of logos so the speed stays even. */
  secondsPerLogo?: number;
}

/**
 * Infinite, horizontally scrolling logo strip. Pure CSS (see .marquee in globals.css):
 * pauses on hover and keyboard focus, and becomes a static, wrapping row under prefers-reduced-motion.
 * The list is rendered twice so the loop is seamless; the copy is hidden from assistive technology.
 */
/** Each half of the track holds at least this many items, so a short list still fills wide screens. */
const MIN_ITEMS_PER_HALF = 10;

export function LogoMarquee({ partners, label, secondsPerLogo = 4 }: LogoMarqueeProps) {
  if (partners.length === 0) return null;
  // Two identical halves; each half repeats the list enough times to be wider than the viewport.
  const repeats = Math.ceil(MIN_ITEMS_PER_HALF / partners.length);
  const half = Array.from({ length: repeats }, () => partners).flat();
  const duration = `${Math.max(half.length * secondsPerLogo, 20)}s`;

  return (
    <div className="marquee group relative overflow-hidden" style={{ ["--marquee-duration" as string]: duration }}>
      {/* Soft fade at both edges. */}
      <span aria-hidden="true" className="marquee-fade pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24" />
      <span aria-hidden="true" className="marquee-fade pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24" />
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-label={copy === 0 ? label : undefined}
            aria-hidden={copy === 1 ? true : undefined}
            className="marquee-list flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16"
          >
            {half.map((partner, index) => {
              // Only the first pass of the first half is read out; the repeats are visual only.
              const hidden = copy === 1 || index >= partners.length;
              return (
                <li
                  key={`${copy}-${index}`}
                  aria-hidden={hidden && copy === 0 ? true : undefined}
                  className="marquee-item flex h-10 shrink-0 items-center sm:h-12"
                  data-repeat={index >= partners.length ? "" : undefined}
                >
                  <PartnerLogo partner={partner} hidden={hidden} />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}

function PartnerLogo({ partner, hidden }: { partner: Partner; hidden: boolean }) {
  const logo = !partner.logoSrc ? (
    // Text wordmark until an approved logo file is added.
    <span className="whitespace-nowrap text-lg font-semibold tracking-tight text-navy/45 transition-colors duration-300 hover:text-navy sm:text-xl">
      {partner.name}
    </span>
  ) : (
    <Image
      src={partner.logoSrc}
      alt={hidden ? "" : partner.name}
      width={160}
      height={48}
      className="h-8 w-auto max-w-[140px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10 sm:max-w-[160px]"
    />
  );
  if (!partner.href) return logo;
  return (
    <a href={partner.href} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined}>
      {logo}
    </a>
  );
}
