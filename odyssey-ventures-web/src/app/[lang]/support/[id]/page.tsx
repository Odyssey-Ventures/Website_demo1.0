import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReplyForm } from "@/components/support/ReplyForm";
import { StaffActions } from "@/components/support/StaffActions";
import { StatusBadge } from "@/components/support/StatusBadge";
import { Container } from "@/components/ui/Container";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatPostDate } from "@/lib/newsroom";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getViewer } from "@/lib/supabase/server";
import { getQuestion, listReplies } from "@/lib/support";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

interface QuestionParams {
  params: Promise<{ lang: string; id: string }>;
}

/** A private question with its replies. Visible only to its author and staff. */
export default async function QuestionPage({ params }: QuestionParams) {
  const { lang, id } = await params;
  if (!isLocale(lang) || !isSupabaseConfigured) notFound();
  const page = getDictionary(lang).supportPage;
  const [viewer, question] = await Promise.all([getViewer(), getQuestion(id)]);
  const back = (
    <Link href={localizedHref(lang, "/support")} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
      ← {page.detail.back}
    </Link>
  );

  if (!question || !viewer) {
    const loginHref = `${localizedHref(lang, "/login")}?next=${encodeURIComponent(`/${lang}/support/${id}`)}`;
    return (
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          {back}
          <div className="mt-8 rounded-lg border border-line bg-mist p-8 text-center">
            <p className="text-muted">
              <span aria-hidden="true">🔒 </span>
              {page.detail.notAllowed}
            </p>
            {!viewer ? (
              <Link href={loginHref} className="mt-4 inline-block font-medium text-brand-blue">
                {getDictionary(lang).auth.login} →
              </Link>
            ) : null}
          </div>
        </Container>
      </section>
    );
  }

  const replies = await listReplies(question.id);
  const isAuthor = question.author_id === viewer.id;

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {back}
          {viewer.isStaff ? <StaffActions lang={lang} questionId={question.id} status={question.status} dict={page.detail} /> : null}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted">
          <StatusBadge status={question.status} label={page.status[question.status]} />
          <span>{page.categories[question.category]}</span>
          <span>·</span>
          <span>{formatPostDate(question.created_at, lang)}</span>
          {viewer.isStaff ? <span>· {question.author_email}</span> : null}
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-navy">{question.title}</h1>
        <p className="mt-6 whitespace-pre-line rounded-lg border border-line bg-white p-6 leading-relaxed text-navy shadow-card">{question.body}</p>

        <h2 className="mt-12 text-xl font-semibold text-navy">{page.detail.replies}</h2>
        {replies.length === 0 ? <p className="mt-3 text-muted">{page.detail.noReplies}</p> : null}
        <ul className="mt-4 space-y-4">
          {replies.map((reply) => (
            <li
              key={reply.id}
              className={cn("rounded-lg p-5", reply.from_staff ? "border-l-4 border-brand-blue bg-brand-blue-tint/50" : "border border-line bg-white")}
            >
              <p className="text-sm font-semibold text-navy">
                {reply.from_staff ? page.detail.staff : page.detail.author}
                <span className="ml-2 font-normal text-muted">{formatPostDate(reply.created_at, lang)}</span>
                {viewer.isStaff && reply.from_staff ? <span className="ml-2 font-normal text-muted">{reply.author_email}</span> : null}
              </p>
              <p className="mt-2 whitespace-pre-line leading-relaxed text-navy">{reply.body}</p>
            </li>
          ))}
        </ul>

        {question.status === "closed" && !viewer.isStaff ? (
          <p className="mt-8 rounded-lg bg-mist p-5 text-muted">{page.detail.closedNote}</p>
        ) : viewer.isStaff || isAuthor ? (
          <ReplyForm
            questionId={question.id}
            label={viewer.isStaff ? page.detail.replyLabel : page.detail.followUpLabel}
            dict={page.detail}
          />
        ) : null}
      </Container>
    </section>
  );
}
