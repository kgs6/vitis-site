import type { Metadata } from "next";
import type ru from "@/dictionaries/ru.json";

export const locales = ["ru", "en", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";
export type Dict = typeof ru;
export const pages = ["product", "projects", "about", "careers", "contacts"] as const;
export type Page = (typeof pages)[number];
export const site = "https://www.vitis.ua";

export const getDict = async (lang: Locale): Promise<Dict> =>
  (await import(`@/dictionaries/${lang}.json`)).default;

export const tel = (p: string) => `tel:+${p.replace(/\D/g, "")}`;

const ogLocale = { ru: "ru_UA", uk: "uk_UA", en: "en_US" } as const;

// slug "" = home page
export async function pageMeta(lang: string, slug: "" | Page): Promise<Metadata> {
  if (!locales.includes(lang as Locale)) return {};
  const { meta } = await getDict(lang as Locale);
  const { title, description } = slug ? meta.pages[slug] : meta;
  const path = (l: string) => `/${l}${slug && `/${slug}`}`;
  return {
    title,
    description,
    alternates: {
      canonical: path(lang),
      languages: { ...Object.fromEntries(locales.map((l) => [l, path(l)])), "x-default": path(defaultLocale) },
    },
    openGraph: { title, description, url: path(lang), siteName: "Vitis Group", locale: ogLocale[lang as Locale], type: "website", images: ["/img/tile-felluga.jpg"] },
  };
}
