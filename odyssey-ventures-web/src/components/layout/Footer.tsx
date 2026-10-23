import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { mainNav, serviceLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface FooterProps {
  lang: Locale;
  dict: Pick<Dictionary, "common" | "nav" | "language" | "footer">;
}

const linkClass = "text-muted transition-colors duration-200 hover:text-navy";
const headingClass = "text-sm font-semibold uppercase tracking-widest text-navy-600";

/** Light background on purpose: the official logo has black lettering. */
export function Footer({ lang, dict }: FooterProps) {
  const { footer, nav } = dict;

  return (
    <footer className="border-t border-line bg-mist">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo lang={lang} label={dict.common.homeAria} className="-ml-0.5" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{footer.companyInfo}</p>
          </div>

          <nav aria-label={footer.navLabel} className="md:col-span-4">
            <h2 className={headingClass}>{footer.navTitle}</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {/* The Services entry is listed as its four services instead of a link to the Home section. */}
              {mainNav
                .flatMap<{ key: Exclude<keyof typeof nav, "aboutSections">; path: string }>((item) => (item.key === "services" ? [...serviceLinks] : [item]))
                .map((item) => (
                  <li key={item.key}>
                    <Link href={localizedHref(lang, item.path)} className={linkClass}>
                      {nav[item.key]}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className={headingClass}>{footer.contactTitle}</h2>
            <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-muted [overflow-wrap:anywhere]">{footer.contactInfo}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {siteConfig.name}. {footer.rights}
          </p>
          <LanguageSwitcher lang={lang} dict={dict.language} />
        </div>
      </Container>
    </footer>
  );
}
