import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Cormorant_Garamond } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { hero, site } from "@/content/site";
import { getLocale, localeParams } from "@/i18n";
import { localeTags } from "@/i18n/config";
import { publicFileExists } from "@/lib/public-file";
import { businessJsonLd, JsonLd, shareImage, siteUrl, websiteJsonLd } from "@/lib/seo";

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
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s · ${site.name} ${t.tagline}` },
    description: t.meta.description,
    keywords: t.meta.keywords,
    applicationName: site.name,
    authors: [{ name: "Eliel Marcos de Almeida" }],
    creator: site.name,
    publisher: site.name,
    category: "music",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    // não transforma números e endereços em links automáticos (o site já faz isso)
    formatDetection: { telephone: false, address: false, email: false },
    // cidade e país da oficina, para buscas locais
    other: { "geo.region": "BR-SP", "geo.placename": "Taquarituba" },
    openGraph: { locale: localeTags[lang].replace("-", "_"), siteName: site.name, images: [shareImage] },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang, t } = await getLocale(params);
  return (
    <html lang={localeTags[lang]} className={`${GeistSans.variable} ${cormorant.variable} h-full`}>
      <body className="grain flex min-h-full flex-col">
        <JsonLd data={businessJsonLd(lang, t)} />
        <JsonLd data={websiteJsonLd(lang, t)} />
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
