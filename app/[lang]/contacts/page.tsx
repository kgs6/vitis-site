import { getDict, pageMeta, tel, type Locale } from "@/lib/i18n";

export const generateMetadata = async ({ params }: { params: Promise<{ lang: string }> }) => pageMeta((await params).lang, "contacts");

const map = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default async function Contacts({ params }: { params: Promise<{ lang: string }> }) {
  const d = await getDict((await params).lang as Locale);
  const c = d.contacts;
  return (
    <div className="col text-center">
      <h1>{c.title}</h1>
      <address className="not-italic">{c.address.map((l) => <div key={l}>{l}</div>)}</address>
      <p className="mt-2">{c.phoneLabel}: <a href={tel(c.phone)} className="link">{c.phone}</a></p>
      <p><a href={`mailto:${c.email}`} className="link">{c.email}</a></p>
      <p className="mt-4"><a href={map(c.address.join(" "))} target="_blank" rel="noopener noreferrer" className="link inline-block py-2">{c.route}</a></p>
      <h2 className="mt-10 mb-2">{c.departmentsTitle}</h2>
      <ul>{c.departments.map((x) => <li key={x.email}>{x.label}: <a href={`mailto:${x.email}`} className="link">{x.email}</a></li>)}</ul>
      <h2 className="mt-10 mb-4">{c.branchesTitle}</h2>
      <ul className="grid gap-6 text-left sm:grid-cols-2">
        {c.branches.map((b) => (
          <li key={b.city} className="bg-tile2 p-5">
            <h3 className="font-normal">{b.city}</h3>
            <p>{b.address}</p>
            <p><a href={tel(b.phone)} className="link">{b.phone}</a></p>
            <p><a href={`mailto:${b.email}`} className="link">{b.email}</a></p>
            <p><a href={map(`${b.city} ${b.address}`)} target="_blank" rel="noopener noreferrer" className="link inline-block py-1">{c.route}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
}
