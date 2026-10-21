import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { isLocale, locales, type LangParams } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import "../globals.css";

// Latin letters use Inter; Hangul falls through to Noto Sans KR (see fontFamily.sans in tailwind.config.ts).
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const korean = Noto_Sans_KR({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-kr",
  display: "swap",
  preload: false,
});

// This layout is the root layout. Only /en and /ko are generated; other values fail the isLocale() guards below.
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
    title: {
      default: dict.meta.title,
      template: `%s | ${siteConfig.name}`,
    },
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
    robots: siteConfig.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: { children: ReactNode } & LangParams) {
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
    <html lang={lang} className={`${sans.variable} ${korean.variable}`}>
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
          <Header lang={lang} dict={{ common: dict.common, nav: dict.nav, language: dict.language }} />
          <main id="main">{children}</main>
          <Footer lang={lang} dict={{ common: dict.common, nav: dict.nav, language: dict.language, footer: dict.footer }} />
        </LocaleProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
