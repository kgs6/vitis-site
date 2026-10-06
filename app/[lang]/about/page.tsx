import Image from "next/image";
import { getDict, pageMeta, type Locale } from "@/lib/i18n";

export const generateMetadata = async ({ params }: { params: Promise<{ lang: string }> }) => pageMeta((await params).lang, "about");

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const d = await getDict((await params).lang as Locale);
  const a = d.about;
  return (
    <div className="col">
      <h1>{a.title}</h1>
      <Image src="/img/about-collage.jpg" alt={d.alt.collage} width={1600} height={700} priority sizes="(min-width: 960px) 960px, 100vw" className="h-auto w-full" />
      <div className="prose mt-8">
        <h2 className="mb-4 text-center">{a.company}</h2>
        <p>{a.lead.join(" ")}</p>
        {a.text.map((t) => <p key={t}>{t}</p>)}
      </div>
      <Image src="/img/about-team.jpg" alt={d.alt.team} width={1600} height={1067} sizes="(min-width: 960px) 960px, 100vw" className="mt-10 h-auto w-full" />
      <div className="prose mt-8">
        <h2 className="mb-4">{a.teamTitle}</h2>
        <p>{a.team}</p>
      </div>
    </div>
  );
}
