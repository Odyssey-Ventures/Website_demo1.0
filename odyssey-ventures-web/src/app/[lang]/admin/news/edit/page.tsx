import Link from "next/link";
import { notFound } from "next/navigation";
import { PostEditor } from "@/components/newsroom/PostEditor";
import { localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireStaff } from "@/lib/admin/guard";
import { getPost } from "@/lib/newsroom";

export const dynamic = "force-dynamic";

interface EditParams {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ slug?: string }>;
}

/** Write a new post, or edit one with ?slug=. */
export default async function AdminNewsEditPage({ params, searchParams }: EditParams) {
  const { lang } = await params;
  const { slug } = await searchParams;
  await requireStaff(lang, `/admin/news/edit${slug ? `?slug=${encodeURIComponent(slug)}` : ""}`);
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const post = slug ? await getPost(slug) : null;
  if (slug && !post) notFound();

  return (
    <div className="max-w-3xl">
      <Link href={localizedHref(locale, "/admin/news")} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
        ← {dict.admin.news.back}
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-navy">{post ? dict.newsPage.editor.titleEdit : dict.newsPage.editor.titleNew}</h1>
      <div className="mt-8">
        <PostEditor lang={locale} dict={dict.newsPage.editor} post={post ?? undefined} />
      </div>
    </div>
  );
}
