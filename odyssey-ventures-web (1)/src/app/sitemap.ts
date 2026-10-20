import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes = ["", "/academy", "/accelerator", "/advisory"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
