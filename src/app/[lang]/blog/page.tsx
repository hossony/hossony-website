import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Container, PageHeader } from "@/components/PageHeader";
import { Photo, PhotoBand } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { photos, postCover, posts } from "@/content/site";
import { getLocale } from "@/i18n";
import { formatDate } from "@/i18n/config";
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang, t } = await getLocale(params);
  return pageMetadata(lang, "/blog", { title: t.nav.journal, description: `${t.journal.title.join("")} ${t.meta.description}` });
}

export default async function Blog({ params }: PageProps<"/[lang]/blog">) {
  const { lang, t } = await getLocale(params);
  const j = t.journal;
  const [first, ...rest] = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <main>
        <JsonLd data={breadcrumbJsonLd(lang, t, [{ name: t.nav.journal, path: "/blog" }])} />
        <PageHeader index="v." eyebrow={j.eyebrow} title={<Rich parts={j.title} />} />

        <PhotoBand src={photos.journalCover} alt={t.alt.journalCover} tone="#8c4a22" />

        <Container className="pb-28 pt-20 md:pb-40 md:pt-28">
          {first && (
            <Reveal>
              <Link href={`/${lang}/blog/${first.slug}`} className="group grid items-center gap-8 bg-tint-bordo p-6 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:p-10">
                <Photo
                  src={postCover(first.slug)}
                  alt={j.posts[first.slug].title}
                  tone={first.tone}
                  kind={first.kind}
                  label={t.gallery.kinds[first.kind]}
                  className="aspect-[4/3]"
                />
                <div className="md:pr-6">
                  <p className="eyebrow text-bordo">
                    {j.latest} · {formatDate(first.date, lang)}
                  </p>
                  <h2 className="serif mt-6 text-[38px] font-light leading-[1.04] transition-colors duration-500 group-hover:text-varnish md:text-[54px]">
                    {j.posts[first.slug].title}
                  </h2>
                  <p className="mt-6 text-[17px] leading-[1.8] text-soft">{j.posts[first.slug].excerpt}</p>
                  <span className="eyebrow link-underline mt-8 inline-block pb-1 text-ink group-hover:[background-size:100%_1px]">{j.read} →</span>
                </div>
              </Link>
            </Reveal>
          )}

          <ul className="mt-20 md:mt-28">
            {rest.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 100}>
                <Link
                  href={`/${lang}/blog/${p.slug}`}
                  className="group grid gap-6 border-t border-line py-10 md:grid-cols-[15rem_1fr_auto] md:items-center md:gap-12"
                >
                  <Photo
                    src={postCover(p.slug)}
                    alt={j.posts[p.slug].title}
                    tone={p.tone}
                    kind={p.kind}
                    label={t.gallery.kinds[p.kind]}
                    className="aspect-[4/3]"
                    frame={false}
                  />
                  <span>
                    <span className="eyebrow block text-mute">{formatDate(p.date, lang)}</span>
                    <span className="serif mt-3 block text-[30px] leading-tight transition-colors duration-500 group-hover:text-varnish md:text-[36px]">
                      {j.posts[p.slug].title}
                    </span>
                    <span className="mt-3 block max-w-2xl text-[15.5px] leading-[1.75] text-soft">{j.posts[p.slug].excerpt}</span>
                  </span>
                  <span aria-hidden className="serif hidden text-[28px] font-light text-mute transition-transform duration-700 group-hover:translate-x-1 group-hover:text-varnish md:block">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
