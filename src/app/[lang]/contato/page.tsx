import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Container, PageHeader } from "@/components/PageHeader";
import { PhotoBand } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { mapsDirectionsUrl, mapsEmbedUrl, photos, site } from "@/content/site";
import { getLocale } from "@/i18n";
import { publicFileExists } from "@/lib/public-file";
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contato">): Promise<Metadata> {
  const { lang, t } = await getLocale(params);
  const image = publicFileExists(photos.contact) ? photos.contact : undefined;
  return pageMetadata(lang, "/contato", { title: t.nav.contact, description: t.contact.intro, image });
}

export default async function Contato({ params }: PageProps<"/[lang]/contato">) {
  const { lang, t } = await getLocale(params);
  const c = site.contact;
  const L = t.contact.labels;
  const items = [
    { label: L.phone, value: c.phone, href: `https://wa.me/${c.whatsapp}`, external: true },
    { label: L.email, value: c.email, href: `mailto:${c.email}`, external: false },
    { label: L.instagram, value: `@${c.instagram}`, href: c.instagramUrl, external: true },
  ];

  return (
    <>
      <main>
        <JsonLd data={breadcrumbJsonLd(lang, t, [{ name: t.nav.contact, path: "/contato" }])} />
        <PageHeader index="vi." eyebrow={t.contact.eyebrow} title={<Rich parts={t.contact.title} />} intro={t.contact.intro} />

        <PhotoBand src={photos.contact} alt={t.alt.contact} tone="#46604b" />

        <Container className="grid gap-16 pb-24 pt-20 md:grid-cols-[0.85fr_1.15fr] md:gap-24 md:pb-32 md:pt-28">
          <div>
            <dl className="space-y-9">
              {items.map((it, i) => (
                <Reveal key={it.label} delay={i * 100}>
                  <dt className="eyebrow text-mute">{it.label}</dt>
                  <dd className="mt-2">
                    <a
                      href={it.href}
                      target={it.external ? "_blank" : undefined}
                      rel={it.external ? "noreferrer" : undefined}
                      className="serif link-underline break-all text-[26px] leading-tight hover:text-varnish sm:break-normal md:text-[30px]"
                    >
                      {it.value}
                    </a>
                  </dd>
                </Reveal>
              ))}
            </dl>

            {/* endereço + como chegar */}
            <Reveal delay={300} className="mt-12 border-t border-line pt-10">
              <p className="eyebrow text-mute">{L.address}</p>
              <address className="serif mt-4 text-[22px] not-italic leading-[1.45] md:text-[24px]">
                {site.address.street}
                <br />
                {site.address.district}
                <br />
                {site.address.city} · {site.address.zip}
                <br />
                {t.contact.country}
              </address>
              <p className="mt-4 text-[14.5px] text-soft">{t.contact.visit}</p>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="eyebrow group mt-8 inline-flex h-14 items-center gap-4 bg-varnish px-8 text-cream transition-colors duration-500 hover:bg-ink"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                {t.contact.directions}
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <ContactForm t={t.contact.form} />
          </Reveal>
        </Container>

        {/* mapa */}
        <Reveal className="mx-auto w-full max-w-[1320px] px-6 pb-28 md:px-10 md:pb-40">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-sand sm:aspect-[16/9] lg:aspect-[21/8]">
            <iframe
              src={mapsEmbedUrl}
              title={t.contact.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:sepia(0.25)_saturate(0.85)_contrast(0.95)]"
              allowFullScreen
            />
          </div>
        </Reveal>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
