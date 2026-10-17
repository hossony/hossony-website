import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "./config";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { it } from "./locales/it";
import { pt } from "./locales/pt";
import type { Dictionary } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { pt, it, en, fr, es, de };

/** Lê o idioma da rota e devolve o dicionário. Idioma desconhecido → 404. */
export async function getLocale(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return { lang, t: dictionaries[lang] };
}

export function localeParams() {
  return locales.map((lang) => ({ lang }));
}

export type { Dictionary } from "./types";
export type { Locale } from "./config";
