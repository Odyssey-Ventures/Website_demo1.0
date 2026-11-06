import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { isMembershipTier } from "@/config/membership";
import { supabaseUrl } from "@/lib/supabase/config";

/**
 * Stripe → Supabase membership sync.
 * Needs STRIPE_WEBHOOK_SECRET and SUPABASE_SERVICE_ROLE_KEY in Vercel (server-only, never NEXT_PUBLIC_).
 * Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted.
 */
export const runtime = "nodejs";

const TOLERANCE_SECONDS = 300;

function verify(payload: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const parts = header.split(",").map((part) => part.split("=") as [string, string]);
  const timestamp = parts.find(([key]) => key === "t")?.[1];
  const signatures = parts.filter(([key]) => key === "v1").map(([, value]) => value);
  if (!timestamp || signatures.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > TOLERANCE_SECONDS) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex"));
  return signatures.some((sig) => {
    const given = Buffer.from(sig);
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

async function writeMembership(serviceKey: string, query: string, row: Record<string, unknown>, upsert: boolean) {
  const url = `${supabaseUrl}/rest/v1/memberships${query}`;
  const response = await fetch(url, {
    method: upsert ? "POST" : "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: upsert ? "resolution=merge-duplicates,return=minimal" : "return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${await response.text()}`);
}

const statusFromStripe = (status: string) => (status === "active" || status === "trialing" ? "active" : status === "past_due" || status === "unpaid" ? "past_due" : "canceled");

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret || !serviceKey) return NextResponse.json({ error: "not configured" }, { status: 503 });

  const payload = await request.text();
  if (!verify(payload, request.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  const event = JSON.parse(payload) as { type: string; data: { object: Record<string, any> } };
  const object = event.data.object;

  try {
    if (event.type === "checkout.session.completed") {
      const userId = object.client_reference_id;
      const tier = object.metadata?.tier;
      if (typeof userId === "string" && /^[0-9a-f-]{36}$/i.test(userId) && isMembershipTier(tier)) {
        await writeMembership(
          serviceKey,
          "?on_conflict=user_id",
          { user_id: userId, tier, status: "active", stripe_customer_id: object.customer ?? null, stripe_subscription_id: object.subscription ?? null },
          true
        );
      }
    } else if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      const status = event.type === "customer.subscription.deleted" ? "canceled" : statusFromStripe(object.status);
      const tier = object.metadata?.tier;
      // Newer API versions keep the period end on the subscription item.
      const periodEnd = object.current_period_end ?? object.items?.data?.[0]?.current_period_end;
      const row: Record<string, unknown> = {
        status,
        current_period_end: typeof periodEnd === "number" ? new Date(periodEnd * 1000).toISOString() : null,
      };
      if (status === "canceled") row.tier = "free";
      else if (isMembershipTier(tier)) row.tier = tier;
      await writeMembership(serviceKey, `?stripe_subscription_id=eq.${encodeURIComponent(object.id)}`, row, false);
    }
  } catch (error) {
    console.error("stripe webhook", error);
    return NextResponse.json({ error: "sync failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
