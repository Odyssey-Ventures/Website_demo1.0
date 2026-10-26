"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { localizedHref } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";

export default function NotFound() {
  const { lang, notFound } = useLocale();

  return (
    <Container className="py-28">
      <span aria-hidden="true" className="block h-1 w-14 rounded-full bg-brand-green" />
      <h1 className="mt-6 text-5xl font-semibold tracking-tight">{notFound.title}</h1>
      <p className="mt-4 max-w-md text-lg text-muted">{notFound.description}</p>
      <Button href={localizedHref(lang)} className="mt-8">
        {notFound.backHome}
      </Button>
    </Container>
  );
}
