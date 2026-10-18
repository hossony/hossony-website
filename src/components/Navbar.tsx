"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { LOCALE_COOKIE, locales, localeNames, swapLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { navItems } from "./nav-items";

type NavDict = Dictionary["nav"];

function rememberLocale(l: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
}

/** Desktop: botão "PT ▾" que abre a lista de idiomas. */
function LangDropdown({ lang, label, light }: { lang: Locale; label: string; light: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${label}: ${localeNames[lang]}`}
        className={`eyebrow flex items-center gap-2 transition-colors duration-500 ${light ? "text-cream hover:text-cream" : "text-ink hover:text-varnish"}`}
      >
        {lang.toUpperCase()}
        <svg viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform duration-500 ${open ? "rotate-180" : ""}`} aria-hidden>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      <div
        className={`absolute right-0 top-full mt-4 w-48 border border-line bg-paper py-2 shadow-[0_20px_40px_-20px_rgb(47_34_26/0.35)] transition-[opacity,transform,visibility] duration-500 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <p className="eyebrow px-5 pb-2 pt-1 text-[10px] text-mute">{label}</p>
        {locales.map((l) => (
          <Link
            key={l}
            href={swapLocale(pathname, l)}
            hrefLang={l}
            lang={l}
            onClick={() => {
              rememberLocale(l);
              setOpen(false);
            }}
            aria-current={l === lang ? "true" : undefined}
            className={`flex items-baseline justify-between px-5 py-2 transition-colors duration-300 hover:bg-sand ${l === lang ? "text-varnish" : "text-ink"}`}
          >
            <span className="serif text-[18px]">{localeNames[l]}</span>
            <span className="eyebrow text-[10px] text-mute">{l.toUpperCase()}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Mobile: todos os idiomas visíveis dentro do menu aberto. */
function LangList({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname();
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-x-5 gap-y-2">
      {locales.map((l) => (
        <Link
          key={l}
          href={swapLocale(pathname, l)}
          hrefLang={l}
          lang={l}
          title={localeNames[l]}
          onClick={() => rememberLocale(l)}
          aria-current={l === lang ? "true" : undefined}
          className={`eyebrow text-[13px] ${l === lang ? "text-varnish" : "text-mute hover:text-ink"}`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

/**
 * `darkTop`: sub-rotas que começam com uma capa escura (ex.: ["", "/sobre"]).
 * Nelas o menu fica claro até a página rolar.
 */
export function Navbar({ lang, t, tagline, darkTop = [] }: { lang: Locale; t: NavDict; tagline: string; darkTop?: string[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === `/${lang}`;
  const items = navItems(lang, t);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled && !open;
  const light = darkTop.some((p) => pathname === `/${lang}${p}`) && !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-700 ${
          // desfoque só em telas maiores: no celular o fundo quase opaco tem o mesmo efeito sem custo de GPU
          solid ? "border-b border-line/80 bg-cream/95 md:bg-cream/85 md:backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-6 px-6 md:h-[88px] md:px-10">
          <Link
            href={`/${lang}`}
            onClick={() => setOpen(false)}
            aria-label={`${site.name} — ${t.home}`}
            className={`serif shrink-0 text-[26px] font-normal leading-none tracking-[0.02em] transition-[opacity,color] duration-700 md:text-[28px] ${
              isHome && !scrolled && !open ? "pointer-events-none opacity-0" : "opacity-100"
            } ${light ? "text-cream" : "text-ink"}`}
          >
            {site.name}
          </Link>

          <div className="hidden items-center gap-9 xl:flex">
            <nav aria-label="Principal" className="flex items-center gap-8">
              {items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-underline eyebrow pb-1 transition-colors duration-700 ${
                      light ? "text-cream/85 hover:text-cream" : active ? "text-varnish" : "text-soft hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <span aria-hidden className={`h-4 w-px ${light ? "bg-cream/30" : "bg-line-2"}`} />
            <LangDropdown lang={lang} label={t.language} light={light} />
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className={`eyebrow relative z-50 flex items-center gap-3 transition-colors duration-700 xl:hidden ${light ? "text-cream" : "text-ink"}`}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? t.close : t.menu}
            <span className="relative block h-3 w-6">
              <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 flex flex-col bg-cream transition-[opacity,visibility] duration-700 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Menu" className="flex flex-1 flex-col justify-center overflow-y-auto px-8 pt-24">
          {[{ href: `/${lang}`, label: t.home }, ...items].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              className={`serif border-b border-line py-3.5 text-[34px] font-light leading-none transition-[opacity,transform] duration-700 ease-[var(--ease-luxe)] sm:text-[44px] ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } ${pathname === item.href ? "italic text-varnish" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-4 px-8 pb-10 pt-6">
          <LangList lang={lang} label={t.language} />
          <p className="eyebrow text-mute">
            {site.name} · {tagline}
          </p>
        </div>
      </div>
    </>
  );
}
