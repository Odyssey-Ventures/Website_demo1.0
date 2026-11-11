/**
 * The four membership tiers. Prices are display text; the charge itself is set on the Stripe price.
 *
 * Basic and Pro pay through Stripe Payment Links. Production reads them from
 * MEMBERSHIP_PAYMENT_URL_BASIC / MEMBERSHIP_PAYMENT_URL_PRO (see docs/operations.md).
 * Previews fall back to the Stripe test-mode links below, so the flow can be tried with test cards.
 */
export const membershipTiers = ["free", "basic", "pro", "enterprise"] as const;
export type MembershipTier = (typeof membershipTiers)[number];

const TEST_LINKS: Partial<Record<MembershipTier, string>> = {
  basic: "https://buy.stripe.com/test_cNi5kFeBw72xcr7exP2wU00",
  pro: "https://buy.stripe.com/test_8x29AVgJE0E99eVfBT2wU01",
};

const isProduction = process.env.VERCEL_ENV === "production";

function httpsUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return new URL(value.trim()).protocol === "https:" ? value.trim() : undefined;
  } catch {
    return undefined;
  }
}

const envLinks: Partial<Record<MembershipTier, string | undefined>> = {
  basic: process.env.MEMBERSHIP_PAYMENT_URL_BASIC,
  pro: process.env.MEMBERSHIP_PAYMENT_URL_PRO,
};

export function membershipPaymentUrl(tier: MembershipTier): string | undefined {
  return httpsUrl(envLinks[tier]) ?? (isProduction ? undefined : TEST_LINKS[tier]);
}

/** The person's account id goes in client_reference_id so the webhook knows whose membership it is. */
export function membershipCheckoutHref(url: string, userId: string, email: string): string {
  const link = new URL(url);
  link.searchParams.set("client_reference_id", userId);
  link.searchParams.set("prefilled_email", email);
  return link.toString();
}

export function isMembershipTier(value: unknown): value is MembershipTier {
  return typeof value === "string" && (membershipTiers as readonly string[]).includes(value);
}
