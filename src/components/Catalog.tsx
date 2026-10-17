import Link from "next/link";
import { gallery } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

type GalleryDict = Dictionary["gallery"];

/** Mistura o tom do instrumento com o creme do site. */
const tint = (tone: string, pct: number) => `color-mix(in srgb, ${tone} ${pct}%, var(--color-cream))`;

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[8.5rem_1fr] gap-4 border-t border-line py-4 sm:grid-cols-[10rem_1fr]">
      <dt className="eyebrow pt-1 text-mute">{label}</dt>
      <dd className="text-[15.5px] leading-relaxed text-ink/85">{children}</dd>
    </div>
  );
}

export function Catalog({ lang, t }: { lang: Locale; t: GalleryDict }) {
  return (
    <div>
      {gallery.map((item, i) => {
        const text = t.items[item.id];
        const kind = t.kinds[item.kind];
        const reversed = i % 2 === 1;
        return (
          <section key={item.id} aria-labelledby={`peca-${i}`} style={{ background: i % 2 ? tint(item.tone, 7) : undefined }}>
            <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28 lg:gap-24">
              <Reveal className={reversed ? "md:order-2" : ""}>
                <Photo src={item.src} alt={text.name} tone={item.tone} kind={item.kind} label={kind} />
              </Reveal>

              <Reveal delay={150} className={reversed ? "md:order-1" : ""}>
                <p className="eyebrow" style={{ color: item.tone }}>
                  Nº {String(i + 1).padStart(2, "0")} · {kind}
                </p>
                <h2 id={`peca-${i}`} className="serif mt-5 text-[42px] font-light leading-[1.02] md:text-[58px]">
                  {text.name}
                </h2>
                <p className="mt-5 max-w-lg text-[16.5px] leading-[1.8] text-soft">{text.description}</p>

                <dl className="mt-10 border-b border-line">
                  <Spec label={t.specs.model}>{kind}</Spec>
                  <Spec label={t.specs.color}>
                    <span className="flex items-center gap-3">
                      <span aria-hidden className="size-4 rounded-full ring-1 ring-black/10" style={{ background: item.tone }} />
                      {text.color}
                    </span>
                  </Spec>
                  <Spec label={t.specs.varnish}>{text.varnish}</Spec>
                  <Spec label={t.specs.inspired}>
                    <span className="serif text-[19px] italic">{text.inspiredBy}</span>
                  </Spec>
                  <Spec label={t.specs.accessories}>
                    <ul className="flex flex-wrap gap-x-2 gap-y-1">
                      {text.accessories.map((acc, j) => (
                        <li key={acc}>
                          {acc}
                          {j < text.accessories.length - 1 && <span className="ml-2 text-line-2">·</span>}
                        </li>
                      ))}
                    </ul>
                  </Spec>
                </dl>

                <Link
                  href={`/${lang}/contato`}
                  className="eyebrow group/cta mt-10 inline-flex items-center gap-3 pb-1 text-ink transition-colors duration-500 hover:text-[var(--tone)]"
                  style={{ ["--tone" as string]: item.tone }}
                >
                  <span className="link-underline pb-1">{t.consult}</span>
                  <span aria-hidden className="transition-transform duration-500 group-hover/cta:translate-x-1">→</span>
                </Link>
              </Reveal>
            </div>
          </section>
        );
      })}
    </div>
  );
}
