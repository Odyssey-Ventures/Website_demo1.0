import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";

const paths = ["", "/about", "/academy", "/accelerator", "/advisory", "/consulting"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${siteConfig.url}/${lang}${path}`,
      lastModified,
      alternates: {
        languages: Object.fromEntries(locales.map((code) => [code, `${siteConfig.url}/${code}${path}`])),
      },
    }))
  );
}
