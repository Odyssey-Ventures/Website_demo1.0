"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/** Paid registrations for a program (public count, no names). Null when the count cannot be read. */
export async function fetchPaidCount(programId: string): Promise<number | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await getSupabaseBrowserClient().rpc("program_paid_count", { p_program_id: programId });
  return error || typeof data !== "number" ? null : data;
}

/** Saves a pending registration. The id goes to Stripe as client_reference_id, and the webhook marks it paid. */
export async function savePendingRegistration(row: { id: string; programId: string; name: string; email: string; company: string }): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  const { error } = await getSupabaseBrowserClient()
    .from("program_registrations")
    .insert({ id: row.id, program_id: row.programId, name: row.name, email: row.email, company: row.company });
  return !error;
}
