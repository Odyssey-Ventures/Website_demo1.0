import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AuthCard, safeNextPath } from "@/components/auth/AuthCard";
import { SignupForm } from "@/components/auth/SignupForm";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getViewer } from "@/lib/supabase/server";

interface SignupParams {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ next?: string }>;
}

export async function generateMetadata({ params }: SignupParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.signup;
  return { title: page.title, description: page.description, robots: { index: false, follow: false } };
}

export default async function SignupPage({ params, searchParams }: SignupParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const next = safeNextPath((await searchParams).next, `/${lang}`);
  const dict = getDictionary(lang).auth;

  if (await getViewer()) redirect(next);

  return (
    <AuthCard title={dict.signupTitle} description={isSupabaseConfigured ? dict.signupDescription : dict.notConfigured}>
      {isSupabaseConfigured ? <SignupForm dict={dict} next={next} lang={lang} /> : null}
    </AuthCard>
  );
}
