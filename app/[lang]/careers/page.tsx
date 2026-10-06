import { getDict, pageMeta, type Locale } from "@/lib/i18n";

export const generateMetadata = async ({ params }: { params: Promise<{ lang: string }> }) => pageMeta((await params).lang, "careers");

type Sec = { h: string; items?: string[]; text?: string };

export default async function Careers({ params }: { params: Promise<{ lang: string }> }) {
  const d = await getDict((await params).lang as Locale);
  const c = d.careers;
  return (
    <div className="col prose">
      <h1>{c.title}</h1>
      <p>{c.intro}</p>
      {c.jobs.map((j) => (
        <section key={j.title} className="mt-10">
          <h2 className="mb-3 text-center">{j.title}</h2>
          {"lead" in j && <p>{j.lead}</p>}
          {(j.sections as Sec[]).map((s) => (
            <div key={s.h} className="mt-4">
              <h3 className="italic">{s.h}</h3>
              {s.text && <p>{s.text}</p>}
              {s.items && <ul className="list-disc pl-6">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>}
            </div>
          ))}
          <p className="mt-4">{j.apply}</p>
        </section>
      ))}
      <p className="mt-10">{c.outro} <a href="mailto:hr@vitis.com.ua" className="link">{c.cta}</a></p>
    </div>
  );
}
