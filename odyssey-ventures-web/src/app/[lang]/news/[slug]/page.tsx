import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommentActions } from "@/components/newsroom/CommentActions";
import { CommentForm } from "@/components/newsroom/CommentForm";
import { Container } from "@/components/ui/Container";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatPostDate, getPost, listComments, paragraphs } from "@/lib/newsroom";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getViewer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface NewsParams {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: NewsParams): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isSupabaseConfigured) return {};
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary, robots: post.published ? undefined : { index: false, follow: false } };
}

export default async function NewsPostPage({ params }: NewsParams) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isSupabaseConfigured) notFound();
  const post = await getPost(slug);
  if (!post) notFound();
  const [comments, viewer] = await Promise.all([listComments(post.id), getViewer()]);
  const page = getDictionary(lang).newsPage;
  const loginHref = `${localizedHref(lang, "/login")}?next=${encodeURIComponent(`/${lang}/news/${slug}`)}`;

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <Link href={localizedHref(lang, "/news")} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
            ← {page.back}
          </Link>
          {viewer?.isStaff ? (
            <Link href={`${localizedHref(lang, "/news/editor")}?slug=${post.slug}`} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
              {page.edit}
            </Link>
          ) : null}
        </div>
        <p className="mt-8 flex items-center gap-3 text-sm font-semibold text-navy-600">
          {formatPostDate(post.created_at, lang)}
          {!post.published ? <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-900">{page.draft}</span> : null}
        </p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight text-navy">{post.title}</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-navy">
          {paragraphs(post.body).map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
        {post.external_url ? (
          <a href={post.external_url} target="_blank" rel="noopener noreferrer" className="mt-10 inline-block font-medium text-brand-blue hover:text-brand-blue-dark">
            {page.external} ↗
          </a>
        ) : null}

        <section className="mt-16 border-t border-line pt-10" aria-labelledby="comments-title">
          <h2 id="comments-title" className="text-2xl font-semibold tracking-tight text-navy">
            {page.comments.title} <span className="text-muted">{comments.filter((comment) => !comment.hidden).length}</span>
          </h2>
          {comments.length === 0 ? <p className="mt-4 text-muted">{page.comments.empty}</p> : null}
          <ul className="mt-6 divide-y divide-line">
            {comments.map((comment) => (
              <li key={comment.id} className={comment.hidden ? "py-5 opacity-60" : "py-5"}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm">
                    <span className="font-semibold text-navy">{comment.author_name}</span>
                    <span className="ml-2 text-muted">{formatPostDate(comment.created_at, lang)}</span>
                    {comment.hidden ? <span className="ml-2 text-xs text-amber-800">{page.comments.hiddenLabel}</span> : null}
                  </p>
                  {viewer ? (
                    <CommentActions
                      commentId={comment.id}
                      hidden={comment.hidden}
                      canModerate={viewer.isStaff}
                      canDelete={comment.author_id === viewer.id}
                      dict={page.comments}
                    />
                  ) : null}
                </div>
                <p className="mt-2 whitespace-pre-line leading-relaxed text-navy">{comment.body}</p>
              </li>
            ))}
          </ul>
          {post.published ? (
            viewer ? (
              <CommentForm postId={post.id} dict={page.comments} />
            ) : (
              <p className="mt-8 rounded-lg border border-line bg-mist p-5 text-muted">
                <Link href={loginHref} className="font-medium text-brand-blue hover:text-brand-blue-dark">
                  {page.comments.loginToComment}
                </Link>
              </p>
            )
          ) : null}
        </section>
      </Container>
    </article>
  );
}
