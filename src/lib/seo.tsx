import type { Metadata } from "next";
import { photos, site } from "@/content/site";
import { locales, localeTags, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

/**
 * Endereço público do site (sem barra no final): canonical, sitemap, Open Graph e JSON-LD.
 * Para trocar sem mexer no código, defina NEXT_PUBLIC_SITE_URL na Vercel.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://hossony.com").replace(/\/$/, "");

/** Páginas públicas, sem o prefixo de idioma ("" é a home). */
export const pagePaths = ["", "/sobre", "/historia", "/colaboradores", "/galeria", "/blog", "/contato"] as const;

/**
 * Códigos hreflang de cada idioma. O português marca o Brasil e também "pt" (Portugal, Angola…);
 * os demais usam só o idioma, para valer em todos os países onde ele é falado (EUA, Reino Unido, México, Suíça…).
 */
const hreflang: Record<Locale, string[]> = {
  pt: ["pt-BR", "pt"],
  it: ["it"],
  en: ["en"],
  fr: ["fr"],
  es: ["es"],
  de: ["de"],
};

/** Canonical + versões em outros idiomas de uma página (path sem idioma, ex.: "/galeria"). */
export function alternates(lang: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) for (const tag of hreflang[l]) languages[tag] = `/${l}${path}`;
  // sem prefixo de idioma, o visitante é levado ao idioma do navegador (ver src/proxy.ts)
  languages["x-default"] = path || "/";
  return { canonical: `/${lang}${path}`, languages };
}

/** Imagem padrão de compartilhamento (WhatsApp, Facebook, LinkedIn, X…). */
export const shareImage = { url: photos.aboutCover, width: 2560, height: 1441 };

/** Metadados de uma página: título, descrição, canonical, hreflang e Open Graph no idioma certo. */
export function pageMetadata(
  lang: Locale,
  path: string,
  { title, description, image, type = "website" }: { title?: string; description?: string; image?: string; type?: "website" | "article" },
): Metadata {
  return {
    title,
    description,
    alternates: alternates(lang, path),
    openGraph: {
      type,
      url: `/${lang}${path}`,
      siteName: site.name,
      locale: localeTags[lang].replace("-", "_"),
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeTags[l].replace("-", "_")),
      title,
      description,
      images: [image ? { url: image } : shareImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [image ?? shareImage.url] },
  };
}

/** Dados estruturados (schema.org) da oficina: aparece no Google com endereço, telefone, mapa e redes. */
export function businessJsonLd(lang: Locale, t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": ["MusicStore", "LocalBusiness"],
    "@id": `${siteUrl}/#hossony`,
    name: `${site.name} ${t.tagline}`,
    alternateName: [site.name, "Hossony Violin Making", "Eliel Luthier"],
    description: t.meta.description,
    url: `${siteUrl}/${lang}`,
    logo: `${siteUrl}/logo.png`,
    image: [`${siteUrl}${photos.aboutCover}`, `${siteUrl}${photos.workshop}`],
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: "Eliel Marcos de Almeida", jobTitle: "Luthier" },
    email: site.contact.email,
    telephone: site.contact.phoneHref.replace("tel:", ""),
    sameAs: [site.contact.instagramUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: "Taquarituba",
      addressRegion: "SP",
      postalCode: site.address.zip,
      addressCountry: "BR",
    },
    // atende o Brasil inteiro e encomendas do exterior
    areaServed: [{ "@type": "Country", name: "Brasil" }, { "@type": "Place", name: "Worldwide" }],
    knowsLanguage: locales.map((l) => localeTags[l]),
    keywords: t.meta.keywords.join(", "),
    makesOffer: Object.values(t.about.madeKinds).map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name, category: "Musical instrument", brand: { "@type": "Brand", name: site.name } },
    })),
  };
}

export function websiteJsonLd(lang: Locale, t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/${lang}`,
    name: site.name,
    description: t.meta.description,
    inLanguage: localeTags[lang],
    publisher: { "@id": `${siteUrl}/#hossony` },
  };
}

/** Trilha de navegação (Início › Página) que o Google mostra no lugar da URL. */
export function breadcrumbJsonLd(lang: Locale, t: Dictionary, trail: { name: string; path: string }[]) {
  const items = [{ name: t.nav.home, path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}/${lang}${item.path}`,
    })),
  };
}

/** <script type="application/ld+json">, com "<" escapado contra injeção de HTML. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
