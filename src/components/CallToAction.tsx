import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { Container } from "./PageHeader";
import { Reveal } from "./Reveal";
import { Rich } from "./Rich";

export function CallToAction({ lang, t }: { lang: Locale; t: Dictionary["cta"] }) {
  return (
    <section className="bg-bordo text-cream">
      <Container className="flex flex-col items-center py-24 text-center md:py-32">
        <Reveal>
          <p className="eyebrow text-cream/60">{t.eyebrow}</p>
          <p className="serif mt-6 text-[40px] font-light leading-[1.05] md:text-[64px]">
            <Rich parts={t.title} accent="text-tint-ambar" />
          </p>
        </Reveal>
        <Reveal delay={150}>
          <Link
            href={`/${lang}/contato`}
            className="eyebrow mt-12 inline-flex h-14 items-center gap-4 border border-cream/70 px-9 text-cream transition-colors duration-500 hover:bg-cream hover:text-bordo"
          >
            {t.button} <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
