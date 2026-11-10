import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireStaff } from "@/lib/admin/guard";
import { formatPostDate, listPosts } from "@/lib/newsroom";

export const dynamic = "force-dynamic";

/** Every post, drafts included (staff see drafts because of the database policy). */
export default async function AdminNewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  await requireStaff(lang, "/admin/news");
  const locale = lang as Locale;
  const dict = getDictionary(locale).admin.news;
  const posts = await listPosts();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-navy">{dict.title}</h1>
        <Button href={localizedHref(locale, "/admin/news/edit")}>{dict.newPost}</Button>
      </div>
      {posts.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-navy/25 bg-white p-8 text-center text-muted">{dict.empty}</p>
      ) : (
        <ul className="mt-8 divide-y divide-line rounded-lg border border-line bg-white shadow-card">
          {posts.map((post) => (
            <li key={post.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6">
              {post.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element -- uploaded images live on Supabase Storage
                <img src={post.cover_image_url} alt="" className="h-16 w-24 shrink-0 rounded object-cover" />
              ) : (
                <div aria-hidden="true" className="hidden h-16 w-24 shrink-0 rounded bg-navy-50 sm:block" />
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-3 text-sm text-muted">
                  {formatPostDate(post.created_at, lang)}
                  <span
                    className={
                      post.published
                        ? "rounded bg-brand-green/30 px-2 py-0.5 text-xs font-semibold text-navy"
                        : "rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900"
                    }
                  >
                    {post.published ? dict.published : dict.draft}
                  </span>
                </p>
                <p className="mt-1 truncate text-lg font-semibold text-navy">{post.title}</p>
              </div>
              <div className="flex shrink-0 gap-5 text-sm font-medium">
                <Link href={`${localizedHref(locale, "/admin/news/edit")}?slug=${post.slug}`} className="text-brand-blue hover:text-brand-blue-dark">
                  {dict.edit}
                </Link>
                <Link href={localizedHref(locale, `/news/${post.slug}`)} className="text-muted hover:text-navy">
                  {dict.view}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
