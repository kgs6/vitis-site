"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pages, type Dict, type Locale } from "@/lib/i18n";

// client only to highlight the active page
export default function Menu({ lang, nav, home, className, linkClass }: { lang: Locale; nav: Dict["nav"]; home: string; className: string; linkClass: string }) {
  const path = usePathname();
  const items = [["", home], ...pages.map((k) => [k, nav[k]])];
  return (
    <ul className={className}>
      {items.map(([k, label]) => {
        const href = `/${lang}${k && `/${k}`}`;
        const on = k ? path.startsWith(href) : path === href;
        return (
          <li key={k}>
            <Link href={href} aria-current={on ? "page" : undefined} className={`${linkClass} ${on ? "bg-sand" : "hover:bg-tile2"}`}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
}
