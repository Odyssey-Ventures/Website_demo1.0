import Link from "next/link";
import { localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireStaff } from "@/lib/admin/guard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** Admin home: what needs attention, and links to Newsroom and advisory requests. */
export default async function AdminHomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  await requireStaff(lang, "/admin");
  const dict = getDictionary(lang as Locale).admin;
  const supabase = await createSupabaseServerClient();
  const [published, drafts, newRequests] = await Promise.all([
    supabase.from("news_posts").select("id", { count: "exact", head: true }).eq("published", true),
    supabase.from("news_posts").select("id", { count: "exact", head: true }).eq("published", false),
    supabase.from("advisory_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);

  const cards = [
    {
      href: "/admin/news",
      title: dict.nav.news,
      text: dict.home.newsText,
      stats: [
        { label: dict.home.published, value: published.count ?? 0 },
        { label: dict.home.drafts, value: drafts.count ?? 0 },
      ],
    },
    {
      href: "/admin/advisory",
      title: dict.nav.advisory,
      text: dict.home.advisoryText,
      stats: [{ label: dict.home.newRequests, value: newRequests.error ? "–" : (newRequests.count ?? 0) }],
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight text-navy">{dict.nav.dashboard}</h1>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              href={localizedHref(lang as Locale, card.href)}
              className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-card transition-colors hover:border-brand-blue"
            >
              <h2 className="text-xl font-semibold text-navy">{card.title}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{card.text}</p>
              <dl className="mt-6 flex gap-8">
                {card.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-sm text-muted">{stat.label}</dt>
                    <dd className="text-2xl font-semibold text-navy">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
