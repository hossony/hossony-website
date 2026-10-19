import type { Metadata } from "next";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Container, PageHeader } from "@/components/PageHeader";
import { PhotoBand } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { photos } from "@/content/site";
import { getLocale } from "@/i18n";
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const TONES = [
  { text: "text-varnish", border: "border-varnish" },
  { text: "text-bordo", border: "border-bordo" },
  { text: "text-musgo", border: "border-musgo" },
  { text: "text-anil", border: "border-anil" },
  { text: "text-ambar", border: "border-ambar" },
  { text: "text-varnish", border: "border-varnish" },
];

export async function generateMetadata({ params }: PageProps<"/[lang]/historia">): Promise<Metadata> {
  const { lang, t } = await getLocale(params);
  return pageMetadata(lang, "/historia", { title: t.nav.history, description: t.history.intro, image: photos.history });
}

export default async function Historia({ params }: PageProps<"/[lang]/historia">) {
  const { lang, t } = await getLocale(params);
  const h = t.history;
  return (
    <>
      <main>
        <JsonLd data={breadcrumbJsonLd(lang, t, [{ name: t.nav.history, path: "/historia" }])} />
        <PageHeader index="ii." eyebrow={`${h.eyebrow} · ${t.since}`} title={<Rich parts={h.title} />} intro={h.intro} />

        <PhotoBand src={photos.history} alt={t.alt.history} tone="#8c4a22" />

        <Container className="py-24 md:py-36">
          <ol className="relative">
            <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-line md:left-1/2" />
            {h.steps.map((step, i) => {
              const right = i % 2 === 1;
              const tone = TONES[i % TONES.length];
              const isYear = /^\d{4}$/.test(step.era);
              return (
                <li key={step.title} className="relative grid pb-20 last:pb-0 md:grid-cols-2 md:gap-24 md:pb-28">
                  <span aria-hidden className={`absolute left-[7px] top-3 size-[9px] rotate-45 border bg-cream ${tone.border} md:left-1/2 md:-ml-[4.5px]`} />
                  <Reveal className={`pl-12 md:pl-0 ${right ? "md:col-start-2" : "md:text-right"}`} delay={80}>
                    {isYear ? (
                      <p className={`serif text-[64px] font-light leading-none md:text-[84px] ${tone.text}`}>{step.era}</p>
                    ) : (
                      <p className={`eyebrow ${tone.text}`}>
                        {ROMAN[i]} · {step.era}
                      </p>
                    )}
                    <h2 className="serif mt-5 text-[34px] font-light leading-[1.05] md:text-[46px]">{step.title}</h2>
                    <p className={`mt-5 max-w-lg text-[16px] leading-[1.85] text-soft ${right ? "" : "md:ml-auto"}`}>{step.text}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>

        {/* a origem do nome */}
        <section className="bg-nogueira text-cream">
          <Container className="grid items-center gap-12 py-24 md:grid-cols-[1.1fr_0.9fr] md:gap-20 md:py-32">
            <Reveal>
              <p className="eyebrow text-ambar">{h.nameEyebrow}</p>
              <h2 className="serif mt-5 text-[46px] font-light leading-[1.02] md:text-[64px]">
                <Rich parts={h.nameTitle} accent="text-tint-ambar" />
              </h2>
              <p className="mt-8 max-w-xl text-[17px] leading-[1.85] text-cream/75">{h.nameText}</p>
            </Reveal>
            <Reveal delay={150}>
              <div className="flex flex-col items-center gap-5 border border-cream/15 px-6 py-12 text-center md:py-16" aria-hidden>
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="serif text-[40px] font-light sm:text-[54px]">
                    <span className="text-tint-ambar">Hö</span>
                    <span className="text-cream/35">fner</span>
                  </span>
                  <span className="serif text-[30px] italic text-cream/40">+</span>
                  <span className="serif text-[40px] font-light sm:text-[54px]">
                    <span className="text-tint-ambar">Sony</span>
                  </span>
                </div>
                <span className="h-px w-24 bg-cream/25" />
                <span className="serif text-[52px] font-light tracking-[0.18em] sm:text-[68px]">HOSSONY</span>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="bg-tint-ambar">
          <Container className="py-24 md:py-32">
            <Reveal>
              <blockquote className="mx-auto max-w-4xl text-center">
                <p className="serif text-[32px] font-light italic leading-[1.3] md:text-[48px]">{h.quote}</p>
                <footer className="eyebrow mt-10 text-mute">{h.quoteSource}</footer>
              </blockquote>
            </Reveal>
          </Container>
        </section>

        <CallToAction lang={lang} t={t.cta} />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
