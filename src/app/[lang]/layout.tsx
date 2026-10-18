import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Cormorant_Garamond } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { hero, site } from "@/content/site";
import { getLocale, localeParams } from "@/i18n";
import { locales, localeTags } from "@/i18n/config";
import { publicFileExists } from "@/lib/public-file";

// fonte variável hospedada junto com o site: um arquivo por estilo, pré-carregado e sem "pulo" de layout
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang, t } = await getLocale(params);
  return {
    title: { default: t.meta.title, template: `%s · ${site.name}` },
    description: t.meta.description,
    alternates: { languages: Object.fromEntries(locales.map((l) => [localeTags[l], `/${l}`])) },
    openGraph: { locale: localeTags[lang], siteName: site.name },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang, t } = await getLocale(params);
  return (
    <html lang={localeTags[lang]} className={`${GeistSans.variable} ${cormorant.variable} h-full`}>
      <body className="grain flex min-h-full flex-col">
        <Navbar
          lang={lang}
          t={t.nav}
          tagline={t.tagline}
          darkTop={[...(publicFileExists(hero.background) && hero.overlay === "escuro" ? [""] : []), "/sobre"]}
        />
        {children}
      </body>
    </html>
  );
}
