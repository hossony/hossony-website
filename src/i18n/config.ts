export const locales = ["pt", "it", "en", "fr", "es", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  it: "Italiano",
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
};

/** Código para <html lang> e para formatar datas. */
export const localeTags: Record<Locale, string> = {
  pt: "pt-BR",
  it: "it-IT",
  en: "en-GB",
  fr: "fr-FR",
  es: "es-ES",
  de: "de-DE",
};

export const LOCALE_COOKIE = "HOSSONY_LANG";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function formatDate(iso: string, locale: Locale) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(localeTags[locale], { day: "numeric", month: "long", year: "numeric" });
}

/** Troca o idioma de um caminho: /pt/galeria → /it/galeria */
export function swapLocale(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  if (parts[1] && isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
}
