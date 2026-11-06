import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/support/StatusBadge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { alternatesFor, isLocale, localizedHref, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatPostDate } from "@/lib/newsroom";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getViewer } from "@/lib/supabase/server";
import { BOARD_PAGE_SIZE, getBoard } from "@/lib/support";

export const dynamic = "force-dynamic";

interface SupportParams extends LangParams {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.support;
  return { title: page.title, description: page.description, alternates: alternatesFor(lang, "/support") };
}

/** Public board: every question is listed, but only its author and staff see the title and can open it. */
export default async function SupportPage({ params, searchParams }: SupportParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const page = dict.supportPage;
  const current = Math.max(1, Number((await searchParams).page) || 1);
  const [rows, viewer] = isSupabaseConfigured ? await Promise.all([getBoard(current), getViewer()]) : [[], null];
  const total = rows[0]?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / BOARD_PAGE_SIZE));
  const askHref = viewer
    ? localizedHref(lang, "/support/new")
    : `${localizedHref(lang, "/login")}?next=${encodeURIComponent(`/${lang}/support/new`)}`;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} accent="blue" />
      <SectionContainer>
        {!isSupabaseConfigured ? (
          <div className="flex flex-col gap-4 rounded-lg border border-dashed border-navy/25 p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted">{page.notConfigured}</p>
            <Button href={localizedHref(lang, "/contact")} variant="secondary" className="shrink-0">
              {dict.nav.contact}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href={localizedHref(lang, "/faq")} className="font-medium text-brand-blue hover:text-brand-blue-dark">
                {page.faqLink} →
              </Link>
              <Button href={askHref}>{page.ask}</Button>
            </div>
            {!viewer ? <p className="mt-4 text-sm text-muted">{page.loginRequired}</p> : null}

            {rows.length === 0 ? (
              <p className="mt-8 rounded-lg border border-dashed border-navy/25 p-8 text-center text-muted">{page.empty}</p>
            ) : (
              <table className="mt-8 w-full border-y border-line text-left">
                <thead className="hidden border-b border-line text-sm text-muted sm:table-header-group">
                  <tr>
                    <th scope="col" className="w-16 py-3 font-medium">{page.columns.number}</th>
                    <th scope="col" className="w-36 py-3 font-medium">{page.columns.category}</th>
                    <th scope="col" className="py-3 font-medium">{page.columns.title}</th>
                    <th scope="col" className="w-28 py-3 font-medium">{page.columns.status}</th>
                    <th scope="col" className="w-36 py-3 font-medium">{page.columns.date}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((row, index) => (
                    <tr key={row.id} className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 py-4 sm:table-row sm:py-0">
                      <td className="hidden py-4 text-sm text-muted sm:table-cell">{total - (current - 1) * BOARD_PAGE_SIZE - index}</td>
                      <td className="text-sm text-muted sm:py-4">{page.categories[row.category]}</td>
                      <td className="col-span-2 sm:py-4">
                        {row.title ? (
                          <Link href={localizedHref(lang, `/support/${row.id}`)} className="font-medium text-navy hover:text-brand-blue">
                            {row.is_mine ? <span className="mr-2 rounded bg-brand-blue-tint px-1.5 py-0.5 text-xs text-brand-blue-dark">{page.mine}</span> : null}
                            {row.title}
                          </Link>
                        ) : (
                          <span className="text-muted">
                            <span aria-hidden="true">🔒 </span>
                            {page.private}
                          </span>
                        )}
                      </td>
                      <td className="sm:py-4">
                        <StatusBadge status={row.status} label={page.status[row.status]} />
                      </td>
                      <td className="text-sm text-muted sm:py-4">{formatPostDate(row.created_at, lang)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {pages > 1 ? (
              <nav className="mt-8 flex items-center justify-center gap-6 text-sm font-medium" aria-label={page.title}>
                {current > 1 ? <Link href={`?page=${current - 1}`} className="text-brand-blue">← {page.prev}</Link> : <span className="text-muted/50">← {page.prev}</span>}
                <span className="text-muted">
                  {current} / {pages}
                </span>
                {current < pages ? <Link href={`?page=${current + 1}`} className="text-brand-blue">{page.next} →</Link> : <span className="text-muted/50">{page.next} →</span>}
              </nav>
            ) : null}
          </>
        )}
      </SectionContainer>
    </>
  );
}
