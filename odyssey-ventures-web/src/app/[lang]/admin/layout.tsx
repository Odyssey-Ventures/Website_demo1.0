import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { localizedHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireStaff } from "@/lib/admin/guard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

/** Staff-only admin area. Each page checks again on the server; see requireStaff. */
export default async function AdminLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const viewer = await requireStaff(lang, "/admin");
  const dict = getDictionary(lang as Locale).admin;
  const links = [
    { href: "/admin", label: dict.nav.dashboard },
    { href: "/admin/news", label: dict.nav.news },
    { href: "/admin/advisory", label: dict.nav.advisory },
  ];

  return (
    <div className="min-h-[70vh] bg-mist">
      <div className="border-b border-line bg-white">
        <Container className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">{dict.title}</p>
          <nav aria-label={dict.title}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={localizedHref(lang as Locale, link.href)} className="text-muted transition-colors hover:text-navy">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="truncate text-sm text-muted">{viewer.email}</p>
        </Container>
      </div>
      <Container className="py-10 sm:py-14">{children}</Container>
    </div>
  );
}
