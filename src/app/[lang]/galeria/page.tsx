import type { Metadata } from "next";
import { CallToAction } from "@/components/CallToAction";
import { Catalog } from "@/components/Catalog";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Rich } from "@/components/Rich";
import { getLocale } from "@/i18n";
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/galeria">): Promise<Metadata> {
  const { lang, t } = await getLocale(params);
  return pageMetadata(lang, "/galeria", { title: t.nav.gallery, description: t.gallery.intro });
}

export default async function Galeria({ params }: PageProps<"/[lang]/galeria">) {
  const { lang, t } = await getLocale(params);
  return (
    <>
      <main>
        <JsonLd data={breadcrumbJsonLd(lang, t, [{ name: t.nav.gallery, path: "/galeria" }])} />
        <PageHeader index="iv." eyebrow={t.gallery.eyebrow} title={<Rich parts={t.gallery.title} />} intro={t.gallery.intro} />
        <div className="border-t border-line">
          <Catalog lang={lang} t={t.gallery} />
        </div>
        <CallToAction lang={lang} t={t.cta} />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
