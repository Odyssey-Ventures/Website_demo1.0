import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { contactHref } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/** Mirrors the live site's footer: logo, Contact link, copyright. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <Link href={contactHref} className="text-muted transition-colors duration-200 hover:text-navy">
          Contact
        </Link>
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
