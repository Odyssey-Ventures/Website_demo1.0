import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { Container } from "@/components/ui/Container";
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
  const next = rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : `/${lang}`;
  const dict = getDictionary(lang).auth;

  if (await getViewer()) redirect(next);

  return (
    <section className="bg-mist py-20 sm:py-28">
      <Container className="max-w-md">
        <div className="rounded-lg border border-line bg-white p-7 shadow-card sm:p-9">
          <h1 className="text-3xl font-semibold tracking-tight text-navy">{dict.title}</h1>
          {isSupabaseConfigured ? (
            <>
              <p className="mt-3 leading-relaxed text-muted">{dict.description}</p>
              {error ? (
                <p className="mt-5 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900" role="alert">
                  {dict.linkError}
                </p>
              ) : null}
              <div className="mt-7">
                <LoginForm dict={dict} next={next} />
              </div>
              <p className="mt-7 border-t border-line pt-5 text-sm leading-relaxed text-muted">{dict.staffHint}</p>
            </>
          ) : (
            <p className="mt-3 leading-relaxed text-muted">{dict.notConfigured}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
