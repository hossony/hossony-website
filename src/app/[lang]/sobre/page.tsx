import type { Metadata } from "next";
import Image from "next/image";
import { CallToAction } from "@/components/CallToAction";
import { Counter } from "@/components/Counter";
import { Footer } from "@/components/Footer";
import { InstrumentEnsemble } from "@/components/InstrumentDrawing";
import { Container } from "@/components/PageHeader";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { made, photos } from "@/content/site";
import { getLocale } from "@/i18n";
import { localeTags } from "@/i18n/config";
import { publicFileExists } from "@/lib/public-file";
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

const ROMAN = ["I", "II", "III", "IV", "V"];

export async function generateMetadata({ params }: PageProps<"/[lang]/sobre">): Promise<Metadata> {
  const { lang, t } = await getLocale(params);
  return pageMetadata(lang, "/sobre", { title: t.nav.about, description: t.about.intro, image: photos.aboutCover });
}

export default async function Sobre({ params }: PageProps<"/[lang]/sobre">) {
  const { lang, t } = await getLocale(params);
  const a = t.about;
  const hasCover = publicFileExists(photos.aboutCover);

  return (
    <>
      <main>
        <JsonLd data={breadcrumbJsonLd(lang, t, [{ name: t.nav.about, path: "/sobre" }])} />
        {/* capa com foto da oficina */}
        <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-nogueira text-cream">
          {hasCover ? (
            <Image src={photos.aboutCover} alt={t.alt.aboutCover} fill preload sizes="100vw" className="cover-zoom object-cover" />
          ) : (
            <div aria-hidden className="absolute inset-0 flex items-end justify-end px-6 pb-10 pt-32 text-cream/15 md:px-16">
              <InstrumentEnsemble className="fade h-[78%] w-full max-w-[720px]" />
            </div>
          )}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgb(28 20 14 / 0.55) 0%, rgb(28 20 14 / 0.15) 35%, rgb(28 20 14 / 0.78) 100%)" }}
          />
          <Container className="relative pb-16 pt-40 md:pb-24">
            <div className="fade-up flex items-center gap-4" style={{ ["--delay" as string]: "150ms" } as React.CSSProperties}>
              <span className="serif text-[18px] italic text-ambar">i.</span>
              <span className="h-px w-12 bg-cream/40" />
              <span className="eyebrow text-cream/75">
                {a.eyebrow} · {t.since}
              </span>
            </div>
            <h1
              className="serif fade-up mt-8 max-w-5xl text-[54px] font-light leading-[0.98] tracking-[-0.01em] text-balance sm:text-[76px] lg:text-[104px]"
              style={{ ["--delay" as string]: "300ms" } as React.CSSProperties}
            >
              <Rich parts={a.title} accent="text-tint-ambar" />
            </h1>
          </Container>
        </section>

        {/* introdução */}
        <Container className="grid items-center gap-14 py-24 md:grid-cols-[0.85fr_1.15fr] md:gap-20 md:py-32">
          <Reveal>
            <Photo src={photos.workshop} alt={t.alt.workshop} tone="#8c4a22" kind="violino" label={t.gallery.kinds.violino} />
          </Reveal>
          <div>
            <Reveal>
              <p className="serif text-[27px] font-light leading-[1.45] md:text-[33px]">{a.intro}</p>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-8 max-w-xl text-[16px] leading-[1.85] text-soft">{a.body}</p>
            </Reveal>
          </div>
        </Container>

        {/* números */}
        <section className="border-y border-line bg-paper/70">
          <Container className="grid md:grid-cols-3">
            {a.facts.map((f, i) => (
              <Reveal key={f.value} delay={i * 120} className="border-line py-10 md:px-10 md:first:pl-0 md:[&:not(:first-child)]:border-l max-md:[&:not(:first-child)]:border-t">
                <p className="serif text-[56px] font-light leading-none text-varnish md:text-[68px]">{f.value}</p>
                <p className="mt-3 max-w-[18rem] text-[14.5px] leading-relaxed text-soft">{f.label}</p>
              </Reveal>
            ))}
          </Container>
        </section>

        {/* instrumentos fabricados */}
        <Container className="py-24 md:py-32">
          <Reveal>
            <p className="eyebrow text-varnish">{a.madeEyebrow}</p>
            <h2 className="serif mt-5 max-w-3xl text-[42px] font-light leading-[1.02] md:text-[58px]">{a.madeTitle}</h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-2 border-t border-line lg:grid-cols-4">
            {made.map((m, i) => (
              <Reveal
                key={m.kind}
                delay={i * 120}
                className="border-b border-line py-10 max-lg:odd:pr-6 max-lg:even:border-l max-lg:even:pl-6 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:[&:not(:first-child)]:border-l"
              >
                <p className="serif text-[48px] font-light leading-none text-varnish sm:text-[60px] lg:text-[72px]">
                  <Counter value={m.count} locale={localeTags[lang]} />
                  <span className="text-ambar">+</span>
                </p>
                <p className="eyebrow mt-5 text-soft">{a.madeKinds[m.kind]}</p>
              </Reveal>
            ))}
          </div>
        </Container>

        {/* serviços */}
        <section className="bg-tint-musgo py-24 md:py-32">
          <Container>
            <Reveal>
              <p className="eyebrow text-musgo">{a.servicesEyebrow}</p>
              <h2 className="serif mt-5 max-w-3xl text-[42px] font-light leading-[1.02] md:text-[58px]">{a.servicesTitle}</h2>
            </Reveal>
            <div className="mt-16 grid border-t border-musgo/70 md:grid-cols-3">
              {a.services.map((s, i) => (
                <Reveal
                  key={s.title}
                  delay={i * 120}
                  className="border-b border-musgo/20 py-10 md:border-b-0 md:px-10 md:first:pl-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-musgo/20"
                >
                  <p className="serif text-[15px] italic text-musgo">0{i + 1}</p>
                  <h3 className="serif mt-6 text-[32px] font-normal leading-[1.05]">{s.title}</h3>
                  <p className="mt-5 text-[15.5px] leading-[1.8] text-soft">{s.text}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* especialidade: contrabaixos e violoncelos */}
        <Container className="grid items-center gap-14 py-24 md:grid-cols-2 md:gap-20 md:py-36">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <Reveal>
              <Photo src={photos.bass} alt={t.alt.bass} tone="#5f3522" kind="contrabaixo" label={t.gallery.kinds.contrabaixo} className="aspect-[3/5]" />
            </Reveal>
            <Reveal delay={150} className="mt-16">
              <Photo src={photos.cello} alt={t.alt.cello} tone="#8a4426" kind="violoncelo" label={t.gallery.kinds.violoncelo} className="aspect-[3/5]" />
            </Reveal>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow text-bordo">{a.specialtyEyebrow}</p>
              <h2 className="serif mt-5 text-[44px] font-light leading-[1.02] md:text-[60px]">
                <Rich parts={a.specialtyTitle} accent="text-bordo" />
              </h2>
              <p className="mt-7 max-w-lg text-[16.5px] leading-[1.85] text-soft">{a.specialtyText}</p>
            </Reveal>
            <ul className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-2">
              {a.specialtyPoints.map((p, i) => (
                <Reveal key={p} as="li" delay={i * 90} className="flex items-baseline gap-3 border-b border-line py-4 sm:[&:nth-child(even)]:pl-6">
                  <span aria-hidden className="size-[7px] shrink-0 translate-y-[-2px] rotate-45 border border-bordo" />
                  <span className="serif text-[21px]">{p}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>

        {/* princípios */}
        <section className="bg-tint-ambar">
          <Container className="py-24 md:py-32">
            <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
              <Reveal>
                <p className="eyebrow text-varnish">{a.principlesEyebrow}</p>
                <h2 className="serif mt-5 text-[44px] font-light leading-[1.02] md:text-[56px]">
                  <Rich parts={a.principlesTitle} />
                </h2>
              </Reveal>
              <ol>
                {a.principles.map((p, i) => (
                  <Reveal key={p.title} as="li" delay={i * 120} className="grid grid-cols-[4rem_1fr] gap-4 border-t border-varnish/20 py-9 last:border-b">
                    <span className="serif text-[32px] italic leading-none text-ambar">{ROMAN[i]}.</span>
                    <div>
                      <h3 className="serif text-[28px] leading-tight">{p.title}</h3>
                      <p className="mt-2 text-[15.5px] leading-[1.8] text-soft">{p.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <CallToAction lang={lang} t={t.cta} />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
