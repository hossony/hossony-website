import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { postCover, posts, type Instrument, type PostSlug } from "@/content/site";
import { getLocale } from "@/i18n";
import { formatDate, locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

function findPost(slug: string) {
  return posts.find((p) => p.slug === slug) as { slug: PostSlug; date: string; kind: Instrument; tone: string } | undefined;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { t } = await getLocale(params);
  const post = findPost((await params).slug);
  return post ? { title: t.journal.posts[post.slug].title, description: t.journal.posts[post.slug].excerpt } : {};
}

export default async function Post({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, t } = await getLocale(params);
  const post = findPost((await params).slug);
  if (!post) notFound();
  const text = t.journal.posts[post.slug];
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <main>
        <article className="mx-auto w-full max-w-[760px] px-6 pb-24 pt-36 md:pb-32 md:pt-48">
          <Link href={`/${lang}/blog`} className="eyebrow link-underline fade-up pb-1 text-mute hover:text-ink">
            ← {t.journal.back}
          </Link>
          <p className="eyebrow fade-up mt-12 text-varnish" style={{ ["--delay" as string]: "100ms" } as React.CSSProperties}>
            {formatDate(post.date, lang)}
          </p>
          <h1 className="serif fade-up mt-6 text-[46px] font-light leading-[1.02] text-balance md:text-[72px]" style={{ ["--delay" as string]: "200ms" } as React.CSSProperties}>
            {text.title}
          </h1>
          <p className="serif fade-up mt-8 text-[23px] italic leading-[1.5] text-soft" style={{ ["--delay" as string]: "350ms" } as React.CSSProperties}>
            {text.excerpt}
          </p>
          <Reveal className="mt-12">
            <Photo src={postCover(post.slug)} alt={text.title} tone={post.tone} kind={post.kind} label={t.gallery.kinds[post.kind]} className="aspect-[3/2]" />
          </Reveal>
          <div className="my-14 flex items-center gap-4" aria-hidden>
            <span className="h-px flex-1 bg-line" />
            <span className="size-[7px] rotate-45 border border-varnish" />
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="space-y-7 text-[18px] leading-[1.9] text-ink/85">
            {text.body.map((para, i) => (
              <Reveal key={i} as="p" className={i === 0 ? "dropcap" : undefined}>
                {para}
              </Reveal>
            ))}
          </div>
        </article>

        {others.length > 0 && (
          <section className="bg-tint-ambar">
            <div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-20 md:grid-cols-[12rem_1fr_1fr] md:px-10">
              <p className="eyebrow text-mute">{t.journal.more}</p>
              {others.map((p) => (
                <Link key={p.slug} href={`/${lang}/blog/${p.slug}`} className="group">
                  <p className="eyebrow text-mute">{formatDate(p.date, lang)}</p>
                  <p className="serif mt-3 text-[28px] leading-tight transition-colors duration-500 group-hover:text-varnish">{t.journal.posts[p.slug].title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
