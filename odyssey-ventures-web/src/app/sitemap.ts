import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";

const paths = ["", "/about", "/academy", "/advisory", "/advisory/request", "/accelerator", "/consulting", "/news", "/membership", "/contact"];

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
