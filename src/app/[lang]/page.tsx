import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { hero } from "@/content/site";
import { getLocale } from "@/i18n";
import { publicFileExists } from "@/lib/public-file";

/** Home: somente a capa, com a logo no centro. */
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang, t } = await getLocale(params);
  const hasBg = publicFileExists(hero.background);
  const hasLogo = publicFileExists(hero.logo);
  const dark = hasBg && hero.overlay === "escuro";

  return (
    <main className={`relative flex min-h-[100svh] flex-1 flex-col items-center justify-center overflow-hidden px-6 ${dark ? "text-cream" : "text-ink"}`}>
      {hasBg ? (
        <>
          {/* foto de fundo com aproximação lenta */}
          <Image src={hero.background} alt="" aria-hidden fill preload sizes="100vw" className="hero-zoom object-cover" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: dark
                ? "radial-gradient(ellipse 70% 60% at 50% 50%, rgb(28 20 14 / 0.35), rgb(28 20 14 / 0.72))"
                : "radial-gradient(ellipse 70% 60% at 50% 50%, rgb(246 241 232 / 0.55), rgb(246 241 232 / 0.85))",
            }}
          />
        </>
      ) : (
        <>
          {/* luz suave e toques de cor, como verniz sob a luz */}
          <div
            aria-hidden
            className="fade pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 50% at 50% 48%, rgb(255 253 248 / 0.95), transparent 70%), radial-gradient(ellipse 45% 40% at 12% 90%, rgb(181 131 44 / 0.14), transparent 70%), radial-gradient(ellipse 40% 40% at 90% 8%, rgb(110 34 48 / 0.10), transparent 70%)",
            }}
          />
          <div aria-hidden className="fade pointer-events-none absolute inset-0" style={{ ["--delay" as string]: "1200ms" } as React.CSSProperties}>
            <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-line to-transparent" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-line to-transparent" />
          </div>
        </>
      )}

      <div className="relative">
        {hasLogo ? (
          <Image
            src={hero.logo}
            alt={t.meta.title}
            width={800}
            height={800}
            preload
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 320px, 240px"
            className="fade-up h-auto w-[240px] max-w-[70vw] object-contain sm:w-[320px] lg:w-[380px]"
            style={{ ["--delay" as string]: "300ms" } as React.CSSProperties}
          />
        ) : (
          <Logo animated tagline={t.tagline} />
        )}
      </div>

      <p
        className={`fade-up serif relative mt-12 max-w-md text-center text-[19px] italic leading-relaxed sm:text-[22px] ${dark ? "text-cream/85" : "text-soft"}`}
        style={{ ["--delay" as string]: "1400ms" } as React.CSSProperties}
      >
        {t.hero.tagline}
      </p>
      <p
        className={`fade-up eyebrow relative mt-5 text-center text-[10.5px] ${dark ? "text-cream/60" : "text-mute"}`}
        style={{ ["--delay" as string]: "1700ms" } as React.CSSProperties}
      >
        {t.hero.place}
      </p>

      <Link
        href={`/${lang}/sobre`}
        className={`fade group absolute bottom-8 flex flex-col items-center gap-3 md:bottom-10 ${dark ? "text-cream/70 hover:text-cream" : "text-mute hover:text-ink"}`}
        style={{ ["--delay" as string]: "2200ms" } as React.CSSProperties}
      >
        <span className="eyebrow text-[10px]">{t.hero.discover}</span>
        <span className={`relative h-12 w-px overflow-hidden ${dark ? "bg-cream/25" : "bg-line"}`}>
          <span className={`scroll-line absolute inset-0 ${dark ? "bg-cream" : "bg-varnish"}`} />
        </span>
      </Link>
    </main>
  );
}
