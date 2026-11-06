import { getAdvisoryPaymentOptions, paymentHref } from "@/config/payments";
import type { Dictionary } from "@/i18n/dictionaries";

/** Non-member and basic-member payment buttons. Links and prices are set in Vercel (docs/operations.md). */
export function PaymentOptions({ advisorSlug, dict }: { advisorSlug: string; dict: Dictionary["advisors"]["payment"] }) {
  const options = getAdvisoryPaymentOptions();
  const anyLink = options.some((option) => option.url);

  return (
    <section aria-labelledby="payment-title" className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
      <h3 id="payment-title" className="text-xl font-semibold tracking-tight text-navy">
        {dict.title}
      </h3>
      <p className="mt-2 leading-relaxed text-muted">{anyLink ? dict.description : dict.notReadyNote}</p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {options.map((option) => {
          const tier = dict.tiers[option.tier];
          return (
            <li key={option.tier} className="flex flex-col rounded-md border border-line p-5">
              <p className="font-semibold text-navy">{tier.name}</p>
              <p className="mt-1 text-sm text-muted">{tier.note}</p>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-navy">{option.price ?? <span className="text-base font-medium text-muted">{dict.priceTbd}</span>}</p>
              {option.url ? (
                <a
                  href={paymentHref(option.url, advisorSlug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-md bg-brand-blue px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-brand-blue-dark"
                >
                  {dict.pay}
                </a>
              ) : (
                <span className="mt-5 inline-flex cursor-not-allowed items-center justify-center rounded-md bg-mist px-6 py-3 text-base font-medium text-muted">
                  {dict.notReady}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-sm leading-relaxed text-muted">{dict.upperTier}</p>
      {anyLink ? <p className="mt-1 text-sm text-muted">{dict.external}</p> : null}
    </section>
  );
}
