import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { NewPasswordForm } from "@/components/auth/NewPasswordForm";
import { isLocale, localizedHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getViewer } from "@/lib/supabase/server";

interface ResetParams {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ResetParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const page = getDictionary(lang).meta.pages.resetPassword;
  return { title: page.title, description: page.description, robots: { index: false, follow: false } };
}

/** The password-reset email signs the person in and lands here to choose a new password. */
export default async function ResetPasswordPage({ params }: ResetParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang).auth;
  const viewer = await getViewer();

  if (!viewer) {
    return (
      <AuthCard title={dict.newPasswordTitle} description={dict.linkError}>
        <Link href={localizedHref(lang, "/login")} className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">
          ← {dict.backToLogin}
        </Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard title={dict.newPasswordTitle} description={viewer.email}>
      <NewPasswordForm dict={dict} lang={lang} />
    </AuthCard>
  );
}
