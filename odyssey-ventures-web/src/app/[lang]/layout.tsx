import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { isLocale, locales, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import "../globals.css";

// Use browser/system font fallbacks to avoid Google font download failures during Vercel builds.
// Font stacks are defined in tailwind.config.ts.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  const openGraphLocale = lang === "ko" ? "ko_KR" : "en_US";
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.title, template: `%s | ${siteConfig.name}` },
    description: dict.meta.description,
    applicationName: siteConfig.name,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: openGraphLocale,
      url: `/${lang}`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: siteConfig.allowIndexing
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: { children: ReactNode } & LangParams) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: dict.meta.description,
  };

  return (
    <html lang={lang}>
      <body>
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          {dict.common.skipToContent}
        </a>
        <LocaleProvider value={{ lang, notFound: dict.notFound }}>
          <Header lang={lang} dict={{ common: dict.common, nav: dict.nav, language: dict.language, auth: dict.auth }} />
          <main id="main">{children}</main>
          <Footer
            lang={lang}
            dict={{ common: dict.common, nav: dict.nav, language: dict.language, footer: dict.footer }}
          />
        </LocaleProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
