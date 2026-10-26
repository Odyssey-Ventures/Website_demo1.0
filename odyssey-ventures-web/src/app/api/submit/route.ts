import { NextResponse } from "next/server";
import { isSubmissionKind, submissionKinds, validateFields } from "@/lib/submissions";

/**
 * Receives every form on the site and forwards it to the operations Google Sheet
 * through a Google Apps Script web app (SUBMISSIONS_WEBHOOK_URL), which also emails the operator.
 *
 * Responses: 200 saved · 400 invalid input · 503 not connected yet (the form then falls back to email).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Bots that fill the hidden field get a normal-looking answer and nothing is stored.
  if (typeof body.website === "string" && body.website !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!isSubmissionKind(body.kind)) {
    return NextResponse.json({ error: "kind" }, { status: 400 });
  }
  const result = validateFields(body.kind, body.fields);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const webhookUrl = process.env.SUBMISSIONS_WEBHOOK_URL;
  const secret = process.env.SUBMISSIONS_WEBHOOK_SECRET;
  if (!webhookUrl || !secret) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        sheet: submissionKinds[body.kind].sheet,
        kind: body.kind,
        lang: typeof body.lang === "string" ? body.lang : "",
        page: typeof body.page === "string" ? body.page.slice(0, 300) : "",
        submittedAt: new Date().toISOString(),
        fields: result.fields,
      }),
      cache: "no-store",
    });
    const reply = (await response.json().catch(() => null)) as { ok?: boolean } | null;
    if (!response.ok || !reply?.ok) {
      console.error("Submission webhook failed", response.status, reply);
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } catch (error) {
    console.error("Submission webhook unreachable", error);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
