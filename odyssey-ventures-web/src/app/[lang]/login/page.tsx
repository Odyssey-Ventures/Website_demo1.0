import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AuthCard, safeNextPath } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getViewer } from "@/lib/supabase/server";

interface LoginParams {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ next?: string; error?: string }>;
}

export async function generateMetadata({ params }: LoginParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.login;
  return { title: page.title, description: page.description, robots: { index: false, follow: false } };
}

export default async function LoginPage({ params, searchParams }: LoginParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { next: rawNext, error } = await searchParams;
  const next = safeNextPath(rawNext, `/${lang}`);
  const dict = getDictionary(lang).auth;

  if (await getViewer()) redirect(next);

  if (!isSupabaseConfigured) {
    return <AuthCard title={dict.title} description={dict.notConfigured}>{null}</AuthCard>;
  }

  return (
    <AuthCard title={dict.title} description={dict.description}>
      {error ? (
        <p className="mb-6 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900" role="alert">
          {dict.linkError}
        </p>
      ) : null}
      <LoginForm dict={dict} next={next} lang={lang} />
      <p className="mt-6 text-xs leading-relaxed text-muted">{dict.staffHint}</p>
    </AuthCard>
  );
}
