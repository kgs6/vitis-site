import Image from "next/image";
import { getDict, pageMeta, type Locale } from "@/lib/i18n";
import { brandNames, brandsByCountry } from "@/lib/brands";

export const generateMetadata = async ({ params }: { params: Promise<{ lang: string }> }) => pageMeta((await params).lang, "product");

export default async function Product({ params }: { params: Promise<{ lang: string }> }) {
  const d = await getDict((await params).lang as Locale);
  const p = d.product;
  return (
    <div className="col">
      <h1>{p.title}</h1>
      <div className="prose">{p.text.map((t) => <p key={t}>{t}</p>)}</div>
      <div className="mt-12 space-y-8">
        {brandsByCountry.map((slugs, i) => (
          <section key={i} id={`c${i}`} className="scroll-mt-20">
            <h2 className={`py-3 text-center ${i % 2 ? "bg-tile2" : "bg-tile"}`}>{p.countries[i]}</h2>
            <ul className="grid grid-cols-2 gap-x-2 sm:grid-cols-3 md:grid-cols-5">
              {slugs.map((s) => (
                <li key={s} className="relative mt-4 h-20">
                  <Image src={`/img/brands/${s}.webp`} alt={brandNames[s]} fill sizes="(min-width: 768px) 190px, 45vw" className="object-contain p-1" />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
