/**
 * Payment buttons for 1:1 advisor meetings. Only non-members and the basic membership tier pay here;
 * higher tiers send the request form only.
 *
 * Each tier's link and price come from Vercel environment variables, so the operator can change them
 * without code (see docs/operations.md). A tier without a link shows "payment coming soon".
 */
export const paymentTiers = ["guest", "member"] as const;

export type PaymentTier = (typeof paymentTiers)[number];

export interface PaymentOption {
  tier: PaymentTier;
  /** Payment page, e.g. a Stripe Payment Link. Only https links are used. */
  url?: string;
  /** Shown as written, e.g. "$150 / 45 min". */
  price?: string;
}

const env: Record<PaymentTier, { url?: string; price?: string }> = {
  guest: { url: process.env.ADVISORY_PAYMENT_URL_GUEST, price: process.env.ADVISORY_PRICE_GUEST },
  member: { url: process.env.ADVISORY_PAYMENT_URL_MEMBER, price: process.env.ADVISORY_PRICE_MEMBER },
};

function httpsUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return new URL(value).protocol === "https:" ? value : undefined;
  } catch {
    return undefined;
  }
}

export function getAdvisoryPaymentOptions(): PaymentOption[] {
  return paymentTiers.map((tier) => ({
    tier,
    url: httpsUrl(env[tier].url?.trim()),
    price: env[tier].price?.trim() || undefined,
  }));
}

/** Stripe Payment Links carry the advisor in client_reference_id, so each payment shows whose meeting it is. */
export function paymentHref(url: string, advisorSlug: string): string {
  const link = new URL(url);
  if (link.hostname.endsWith("stripe.com")) link.searchParams.set("client_reference_id", advisorSlug);
  return link.toString();
}
