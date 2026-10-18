import type { Metadata } from "next";
import Image from "next/image";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Container, PageHeader } from "@/components/PageHeader";
import { PhotoBand } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Rich } from "@/components/Rich";
import { photos, team } from "@/content/site";
import { getLocale } from "@/i18n";
import { publicFileExists } from "@/lib/public-file";

const ROMAN = ["I", "II", "III", "IV"];
const tint = (tone: string, pct: number) => `color-mix(in srgb, ${tone} ${pct}%, var(--color-cream))`;

export async function generateMetadata({ params }: PageProps<"/[lang]/colaboradores">): Promise<Metadata> {
  const { t } = await getLocale(params);
  return { title: t.nav.team, description: t.team.intro };
}

/** Traço de assinatura sob o nome. */
function Flourish({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 260 30" className="mt-1 h-6 w-[220px]" fill="none" aria-hidden>
      <path
        className="sig-draw"
        d="M4 20 C 40 6, 70 26, 104 16 S 168 4, 196 14 S 236 26, 256 8"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Portrait({ member }: { member: (typeof team)[number] }) {
  const hasPhoto = publicFileExists(member.photo);
  return (
    <div className="group relative aspect-[4/5] w-full overflow-hidden" style={{ background: tint(member.tone, 14) }}>
      {hasPhoto ? (
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover grayscale-[15%] transition-[transform,filter] duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center" style={{ color: member.tone }}>
          <span className="serif text-[120px] font-light italic leading-none md:text-[150px]">{member.initials}</span>
          <span className="mt-6 h-px w-16" style={{ background: tint(member.tone, 60) }} />
        </div>
      )}
      <span aria-hidden className="pointer-events-none absolute inset-3 border" style={{ borderColor: hasPhoto ? "rgb(255 255 255 / 0.35)" : tint(member.tone, 35) }} />
    </div>
  );
}

export default async function Colaboradores({ params }: PageProps<"/[lang]/colaboradores">) {
  const { lang, t } = await getLocale(params);
  const tm = t.team;

  return (
    <>
      <main>
        <PageHeader index="iii." eyebrow={`${tm.eyebrow} · ${t.since}`} title={<Rich parts={tm.title} />} intro={tm.intro} />

        {/* retratos */}
        <Container className="grid gap-20 border-t border-line pb-28 pt-16 md:grid-cols-2 md:gap-16 md:pb-36 md:pt-24 lg:gap-28">
          {team.map((member, i) => {
            const info = tm.members[member.id];
            return (
              <Reveal key={member.id} delay={i * 150} className={i === 1 ? "md:mt-32" : ""}>
                <article>
                  <Portrait member={member} />
                  <p className="eyebrow mt-8" style={{ color: member.tone }}>
                    {info.role}
                  </p>
                  <h2 className="serif mt-3 text-[40px] font-light leading-[1.02] md:text-[50px]">{member.name}</h2>
                  <Flourish color={member.tone} />
                  <p className="mt-5 max-w-md text-[16px] leading-[1.8] text-soft">{info.bio}</p>
                </article>
              </Reveal>
            );
          })}
        </Container>

        <PhotoBand src={photos.family} alt={t.alt.family} tone="#8c4a22" />

        {/* tradição de família */}
        <section className="mt-24 bg-tint-ambar md:mt-32">
          <Container className="grid gap-12 py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:py-32">
            <Reveal>
              <p className="eyebrow text-varnish">{tm.traditionEyebrow}</p>
              <h2 className="serif mt-5 text-[44px] font-light leading-[1.02] md:text-[60px]">
                <Rich parts={tm.traditionTitle} />
              </h2>
            </Reveal>
            <div className="space-y-6 md:pt-4">
              {tm.tradition.map((p, i) => (
                <Reveal key={i} delay={i * 120}>
                  <p className={`text-[17px] leading-[1.85] text-ink/85 ${i === 0 ? "dropcap" : ""}`}>{p}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* assinatura e autenticidade */}
        <Container className="grid items-center gap-16 py-24 md:grid-cols-2 md:gap-20 md:py-36">
          <Reveal>
            <figure>
              <InstrumentLabel names={team.map((m) => m.name)} />
              <figcaption className="serif mt-6 text-center text-[17px] italic text-soft">{tm.labelCaption}</figcaption>
            </figure>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow text-bordo">{tm.sealEyebrow}</p>
              <h2 className="serif mt-5 text-[44px] font-light leading-[1.02] md:text-[56px]">
                <Rich parts={tm.sealTitle} accent="text-bordo" />
              </h2>
            </Reveal>
            <ol className="mt-10">
              {tm.sealPoints.map((p, i) => (
                <Reveal key={p.title} as="li" delay={i * 120} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-7 last:border-b">
                  <span className="serif text-[28px] italic leading-none text-ambar">{ROMAN[i]}.</span>
                  <div>
                    <h3 className="serif text-[26px] leading-tight">{p.title}</h3>
                    <p className="mt-2 text-[15.5px] leading-[1.8] text-soft">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>

        <CallToAction lang={lang} t={t.cta} />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}

/** Reprodução da etiqueta colada dentro do instrumento (o latim é tradicional na luteria). */
function InstrumentLabel({ names }: { names: string[] }) {
  return (
    <div className="mx-auto max-w-[520px] -rotate-[0.6deg] p-2 shadow-[0_18px_40px_-24px_rgb(47_34_26/0.45)]" style={{ background: "#efe2c4" }}>
      <div className="relative border border-[#6b5434]/50 p-1.5">
        <div className="border border-[#6b5434]/30 px-6 py-7 text-center text-[#3d2c1c] sm:px-10">
          <p className="eyebrow text-[10px] tracking-[0.5em] text-[#6b5434]">Hossony · 1989</p>
          <p className="serif mt-4 text-[22px] italic leading-snug sm:text-[26px]">{names.join(" & ")}</p>
          <p className="serif mt-3 text-[14px] tracking-[0.18em] text-[#6b5434]">FECERUNT · TAQUARITUBA · BRASIL</p>
          {/* assinatura manuscrita estilizada */}
          <svg viewBox="0 0 240 46" className="mx-auto mt-4 h-10 w-[200px]" fill="none" aria-hidden>
            <path
              d="M8 32 C 18 10, 30 8, 34 28 C 37 40, 46 14, 54 22 C 60 28, 64 34, 72 20 C 78 10, 86 30, 96 26 C 110 20, 118 12, 130 24 C 140 34, 150 18, 162 22 C 180 28, 196 14, 214 18 C 222 20, 228 26, 234 22"
              stroke="#3d2c1c"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path d="M40 40 C 90 36, 150 42, 200 36" stroke="#3d2c1c" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
        {/* selo */}
        <span
          aria-hidden
          className="serif absolute -bottom-5 -right-4 grid size-14 rotate-[-8deg] place-items-center rounded-full text-[24px] italic text-[#f6e9e2] shadow-md"
          style={{ background: "radial-gradient(circle at 35% 30%, #8d2e3d, #6e2230 60%, #4f1722)" }}
        >
          H
        </span>
      </div>
    </div>
  );
}
