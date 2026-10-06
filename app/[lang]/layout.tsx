import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Jost } from "next/font/google";
import "../globals.css";
import { getDict, locales, site, type Locale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sans = Jost({ variable: "--font-jost", subsets: ["latin", "cyrillic"], weight: ["300", "400"] });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));
export const metadata: Metadata = { metadataBase: new URL(site) };

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const d = await getDict(lang as Locale);
  return (
    <html lang={lang} className={sans.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:p-3">{d.nav.skip}</a>
        <Header lang={lang as Locale} d={d} />
        <main id="main" className="flex-1">{children}</main>
        <Footer lang={lang as Locale} d={d} />
      </body>
    </html>
  );
}
