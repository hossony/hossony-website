import Image from "next/image";
import type { Instrument } from "@/content/site";
import { publicFileExists } from "@/lib/public-file";
import { InstrumentDrawing, InstrumentEnsemble } from "./InstrumentDrawing";
import { Reveal } from "./Reveal";

const tint = (tone: string, pct: number) => `color-mix(in srgb, ${tone} ${pct}%, var(--color-cream))`;

/**
 * Foto com moldura editorial. Se o arquivo ainda não existir em /public,
 * mostra uma ilustração do instrumento no tom indicado — a página nunca fica "quebrada".
 */
export function Photo({
  src,
  alt,
  tone = "#8c4a22",
  kind,
  label,
  className = "aspect-[4/5]",
  frame = true,
  fit = "cover",
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  tone?: string;
  /** Instrumento da ilustração; sem `kind`, mostra os quatro juntos */
  kind?: Instrument;
  /** Nome traduzido do instrumento, para a legenda da ilustração */
  label?: string;
  className?: string;
  frame?: boolean;
  /** "contain" mostra a foto inteira, sem cortar as bordas */
  fit?: "cover" | "contain";
  /** Largura exibida, para o navegador baixar só o tamanho necessário */
  sizes?: string;
}) {
  const has = publicFileExists(src);
  return (
    <div className={`group relative w-full overflow-hidden ${className}`} style={{ background: tint(tone, 14) }}>
      {has ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`photo-img h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.03]`}
        />
      ) : (
        <div role="img" aria-label={alt} className="flex h-full w-full items-center justify-center px-[8%] pt-[8%] pb-[6%]" style={{ color: tone }}>
          {kind ? (
            <InstrumentDrawing kind={kind} label={label} className="h-full w-auto max-w-full" />
          ) : (
            <InstrumentEnsemble className="h-full w-full" />
          )}
        </div>
      )}
      {frame && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-3 border"
          style={{ borderColor: has ? "rgb(255 255 255 / 0.35)" : tint(tone, 35) }}
        />
      )}
    </div>
  );
}

/** Faixa de imagem larga entre seções, com leve aproximação ao aparecer. */
export function PhotoBand({ src, alt, tone = "#8c4a22", caption }: { src: string; alt: string; tone?: string; caption?: string }) {
  return (
    <Reveal className="band mx-auto w-full max-w-[1320px] px-6 md:px-10">
      <figure>
        <Photo
          src={src}
          alt={alt}
          tone={tone}
          sizes="(min-width: 1320px) 1240px, 100vw"
          className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
        />
        {caption && <figcaption className="serif mt-4 text-[15px] italic text-mute">{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}
