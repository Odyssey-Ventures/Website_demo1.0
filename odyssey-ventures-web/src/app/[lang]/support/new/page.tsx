import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { QuestionForm } from "@/components/support/QuestionForm";
import { Container } from "@/components/ui/Container";
import { isLocale, localizedHref, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getViewer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function NewQuestionPage({ params }: LangParams) {
  const { lang } = await params;
  if (!isLocale(lang) || !isSupabaseConfigured) notFound();
  const viewer = await getViewer();
  if (!viewer) redirect(`${localizedHref(lang, "/login")}?next=${encodeURIComponent(`/${lang}/support/new`)}`);
  const page = getDictionary(lang).supportPage;

  return (
    <section className="bg-mist py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link href={localizedHref(lang, "/support")} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
          ← {page.detail.back}
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-navy">{page.form.title}</h1>
        <div className="mt-8">
          <QuestionForm lang={lang} dict={page} email={viewer.email} />
        </div>
      </Container>
    </section>
  );
}
