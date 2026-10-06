import type { Dict, Locale } from "@/lib/i18n";
import Menu from "./Menu";
import LangSwitch from "./LangSwitch";

export default function Header({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 pt-3">
        <details className="md:hidden">
          <summary className="flex min-h-11 w-fit cursor-pointer items-center pr-3 text-sm uppercase tracking-wide" aria-label={d.nav.label}>{d.nav.menu}</summary>
          <nav aria-label={d.nav.label} className="absolute inset-x-0 top-full border-b border-tile bg-white px-4 pb-3">
            <Menu lang={lang} nav={d.nav} home={d.hero.brand} className="" linkClass="flex min-h-12 items-center px-3" />
          </nav>
        </details>
        <nav aria-label={d.nav.label} className="col-start-2 hidden md:block">
          <Menu lang={lang} nav={d.nav} home={d.hero.brand} className="flex gap-x-2" linkClass="flex min-h-14 items-center px-6 transition-colors" />
        </nav>
        <div className="col-start-3 flex justify-end"><LangSwitch lang={lang} label={d.nav.lang} /></div>
      </div>
    </header>
  );
}
