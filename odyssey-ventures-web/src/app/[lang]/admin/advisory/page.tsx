import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireStaff } from "@/lib/admin/guard";
import { ADVISORY_BUCKET, type AdvisoryAttachment } from "@/lib/advisory-requests";
import { formatPostDate } from "@/lib/newsroom";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** Signed file links stay valid for this long after the page loads. */
const LINK_SECONDS = 60 * 60;

interface AdvisoryRequestRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  stage: string;
  field: string;
  preferred_expert: string;
  schedule: string;
  request: string;
  attachments: AdvisoryAttachment[];
  status: string;
  created_at: string;
}

function formatSize(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/**
 * Startup Advisory requests with their attachments. Read-only: matching and scheduling stay manual by email.
 * Files are private; each link here is a signed URL that expires after an hour.
 */
export default async function AdminAdvisoryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  await requireStaff(lang, "/admin/advisory");
  const dictAll = getDictionary(lang as Locale);
  const dict = dictAll.admin.advisory;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("advisory_requests").select("*").order("created_at", { ascending: false }).limit(100);
  const requests = (data as AdvisoryRequestRecord[] | null) ?? [];

  const paths = requests.flatMap((request) => request.attachments.map((file) => file.path));
  const signed = new Map<string, string>();
  if (paths.length > 0) {
    const { data: links } = await supabase.storage.from(ADVISORY_BUCKET).createSignedUrls(paths, LINK_SECONDS, { download: true });
    for (const link of links ?? []) if (link.path && link.signedUrl) signed.set(link.path, link.signedUrl);
  }

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-navy">{dict.title}</h1>
      <p className="mt-2 max-w-3xl leading-relaxed text-muted">{dict.description}</p>
      {error ? (
        <p className="mt-8 rounded-lg border border-amber-300 bg-amber-50 p-6 text-amber-900">{dict.notReady}</p>
      ) : requests.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-navy/25 bg-white p-8 text-center text-muted">{dict.empty}</p>
      ) : (
        <ul className="mt-8 space-y-5">
          {requests.map((request) => (
            <li key={request.id} className="rounded-lg border border-line bg-white p-6 shadow-card">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-lg font-semibold text-navy">
                  {request.name}
                  {request.company ? <span className="font-normal text-muted"> · {request.company}</span> : null}
                </p>
                <p className="text-sm text-muted">{formatPostDate(request.created_at, lang)}</p>
              </div>
              <a href={`mailto:${request.email}`} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
                {request.email}
              </a>
              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                {[
                  [dictAll.advisoryRequest.field, dictAll.advisors.areas[request.field as keyof typeof dictAll.advisors.areas] ?? request.field],
                  [dictAll.advisoryRequest.stage, dictAll.advisoryRequest.stages[request.stage as keyof typeof dictAll.advisoryRequest.stages] ?? request.stage],
                  [dictAll.advisoryRequest.preferredExpert, request.preferred_expert],
                  [dictAll.advisoryRequest.schedule, request.schedule],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-muted">{label}</dt>
                    <dd className="font-medium text-navy">{value || "–"}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-navy/80">{request.request}</p>
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-sm font-semibold text-navy">{dict.files}</p>
                {request.attachments.length === 0 ? (
                  <p className="mt-1 text-sm text-muted">{dict.noFiles}</p>
                ) : (
                  <ul className="mt-2 flex flex-wrap gap-3">
                    {request.attachments.map((file) => {
                      const href = signed.get(file.path);
                      return (
                        <li key={file.path}>
                          {href ? (
                            <a
                              href={href}
                              className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium text-brand-blue hover:border-brand-blue"
                            >
                              ↓ {file.name} <span className="text-muted">({formatSize(file.size)})</span>
                            </a>
                          ) : (
                            <span className="text-sm text-muted">{file.name}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
