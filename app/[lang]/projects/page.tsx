import Image from "next/image";
import { getDict, pageMeta, type Locale } from "@/lib/i18n";

export const generateMetadata = async ({ params }: { params: Promise<{ lang: string }> }) => pageMeta((await params).lang, "projects");

const media = ["vino", "wineinfo"] as const;
const alts = ["rose", "glass"] as const;

export default async function Projects({ params }: { params: Promise<{ lang: string }> }) {
  const d = await getDict((await params).lang as Locale);
  const p = d.projects;
  return (
    <div className="col">
      <h1>{p.title}</h1>
      <p className="prose text-justify">{p.intro}</p>
      {p.items.map((it, i) => (
        <section key={it.name} className="mt-10 grid items-center gap-6 md:grid-cols-[1.6fr_1fr] md:gap-8">
          <Image src={`/img/project-${media[i]}.jpg`} alt={d.alt[alts[i]]} width={1000} height={600} sizes="(min-width: 960px) 570px, 100vw" className={`h-auto w-full ${i % 2 ? "md:order-last" : ""}`} />
          <div className="prose">
            <h2 className="sr-only">{it.name}</h2>
            <Image src={`/img/${media[i]}-logo.png`} alt="" width={180} height={126} className="mx-auto mb-6 h-24 w-auto" />
            {it.text.map((t) => <p key={t}>{t}</p>)}
            <ul className="mt-4">{it.links.map((l) => <li key={l.label}><a href={l.href} target="_blank" rel="noopener noreferrer" className="link inline-block py-1">{l.label}</a></li>)}</ul>
          </div>
        </section>
      ))}
      <p className="mt-12 text-center">{p.outro}</p>
    </div>
  );
}
