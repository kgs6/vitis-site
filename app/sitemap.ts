import type { MetadataRoute } from "next";
import { locales, pages, site } from "@/lib/i18n";

const lastModified = new Date("2026-10-06");

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...pages].flatMap((slug) =>
    locales.map((l) => ({
      url: `${site}/${l}${slug && `/${slug}`}`,
      lastModified,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site}/${x}${slug && `/${slug}`}`])) },
    })),
  );
}
