import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function navItems(lang: Locale, t: Dictionary["nav"]) {
  return [
    { href: `/${lang}/sobre`, label: t.about },
    { href: `/${lang}/historia`, label: t.history },
    { href: `/${lang}/colaboradores`, label: t.team },
    { href: `/${lang}/galeria`, label: t.gallery },
    { href: `/${lang}/blog`, label: t.journal },
    { href: `/${lang}/contato`, label: t.contact },
  ];
}
