"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export default function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const path = usePathname();
  return (
    <ul className="flex" aria-label={label}>
      {locales.map((l) => (
        <li key={l}>
          <Link href={path.replace(/^\/[a-z]{2}/, `/${l}`)} hrefLang={l} lang={l} aria-current={l === lang ? "true" : undefined}
            className={`flex min-h-11 min-w-11 items-center justify-center text-sm uppercase ${l === lang ? "font-normal underline underline-offset-4" : "hover:underline underline-offset-4"}`}>{l}</Link>
        </li>
      ))}
    </ul>
  );
}
