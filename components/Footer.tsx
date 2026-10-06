import Image from "next/image";
import Link from "next/link";
import { tel, type Dict, type Locale } from "@/lib/i18n";

export default function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const c = d.contacts;
  const h = "mb-2 text-base font-normal";
  const a = "inline-block py-1 hover:underline";
  return (
    <footer className="bg-paper text-sm">
      <div className="mx-auto grid max-w-4xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Link href={`/${lang}`} aria-label={d.hero.brand}><Image src="/img/mark.png" alt={d.hero.brand} width={150} height={153} className="mb-3 h-14 w-auto" /></Link>
          <address className="not-italic">{c.address.map((l) => <div key={l}>{l}</div>)}</address>
          <a href={`mailto:${c.email}`} className="link">{c.email}</a>
          <p><a href={tel(c.phone)} className="hover:underline">{c.phone}</a></p>
        </div>
        <div>
          <h2 className={h}>{d.nav.product}</h2>
          <ul>{d.product.countries.map((n, i) => <li key={n}><Link href={`/${lang}/product#c${i}`} className={a}>{n}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className={h}>{d.nav.projects}</h2>
          <ul>{d.projects.items.map((p) => <li key={p.name}><a href={p.links[0].href} target="_blank" rel="noopener noreferrer" className={a}>{p.name[0] + p.name.slice(1).toLowerCase()}</a></li>)}</ul>
        </div>
        <div>
          <h2 className={h}>{d.nav.contacts}</h2>
          <ul>
            {c.departments.map((x) => <li key={x.email}><a href={`mailto:${x.email}`} className={a}>{x.label}</a></li>)}
            <li><Link href={`/${lang}/contacts`} className={a}>{c.branchesTitle}</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 pb-6 text-xs">
        <p>© 2008–{new Date().getFullYear()} Vitis Group</p>
        <ul className="flex" aria-label={d.nav.social}>
          <li><a href="https://www.facebook.com/vitisgroup" aria-label="Facebook" className="flex size-11 items-center justify-center"><Image src="/img/social-facebook.png" alt="" width={24} height={24} /></a></li>
          <li><a href="https://www.instagram.com/vitis.group/" aria-label="Instagram" className="flex size-11 items-center justify-center"><Image src="/img/social-instagram.png" alt="" width={24} height={24} /></a></li>
        </ul>
      </div>
    </footer>
  );
}
