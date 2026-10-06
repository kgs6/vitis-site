import Image from "next/image";
import Link from "next/link";
import { getDict, pageMeta, type Locale, type Page } from "@/lib/i18n";

export const generateMetadata = async ({ params }: { params: Promise<{ lang: string }> }) => pageMeta((await params).lang, "");

type Tile = { img: string; alt: string; wide?: boolean; pos?: string } | { k: Page; wide?: boolean; bg: string };
const tiles: Tile[] = [
  { img: "felluga", alt: "felluga" }, { k: "product", bg: "bg-tile" }, { k: "projects", bg: "bg-tile2" }, { img: "vineyard", alt: "vineyard", wide: true },
  { img: "flowers", alt: "flowers", wide: true, pos: "object-[50%_55%]" }, { k: "about", wide: true, bg: "bg-tile" }, { img: "glass", alt: "glass" },
  { img: "ott", alt: "rose" }, { k: "careers", bg: "bg-tile" }, { img: "cristal", alt: "cristal" }, { img: "glasses", alt: "glasses" }, { k: "contacts", bg: "bg-tile2" },
];

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale;
  const d = await getDict(lang);
  return (
    <>
      <section className="flex flex-col items-center px-4 py-12 text-center md:py-24">
        <Image src="/img/logo.png" alt={d.hero.brand} width={1000} height={250} priority sizes="(min-width: 640px) 560px, 80vw" className="h-auto w-[min(560px,85vw)]" />
        <Image src="/img/hero-bottles.jpg" alt="" width={497} height={54} className="mt-10 h-auto w-[min(497px,85vw)]" />
        <h1 className="mt-8 text-balance text-base md:text-lg">{d.hero.slogan}</h1>
      </section>
      <ul className="grid grid-flow-dense grid-cols-2 md:grid-cols-5">
        {tiles.map((t) => {
          const size = t.wide ? "col-span-2 aspect-[2/1] md:aspect-[8/3]" : "aspect-[4/3]";
          return "img" in t ? (
            <li key={t.img} className={`relative ${size}`}>
              <Image src={`/img/tile-${t.img}.jpg`} alt={d.alt[t.alt as keyof typeof d.alt] ?? ""} fill sizes={t.wide ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 20vw, 50vw"} className={`object-cover ${t.pos ?? ""}`} />
            </li>
          ) : (
            <li key={t.k} className={size}>
              <Link href={`/${lang}/${t.k}`} className={`flex size-full flex-col items-center justify-center gap-3 text-lg text-burgundy hover:underline focus-visible:outline-offset-[-4px] ${t.bg}`}>
                {d.nav[t.k]}
                {t.k === "contacts" && <svg aria-hidden viewBox="0 0 24 24" className="size-7 fill-none stroke-current" strokeWidth="1.5"><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="10" r="2.5" /></svg>}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
