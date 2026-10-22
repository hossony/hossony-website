import Link from "next/link";
import { mapsDirectionsUrl, site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { navItems } from "./nav-items";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const items = navItems(lang, t.nav);
  const c = site.contact;
  return (
    <footer className="mt-auto bg-nogueira text-cream">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-16 md:grid-cols-[1.3fr_0.8fr_1.2fr] md:px-10 md:py-20">
        <div>
          <p className="serif text-[34px] font-light leading-none">{site.name}</p>
          <p className="eyebrow mt-3 text-ambar">
            {t.tagline} · {t.since}
          </p>
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-cream/70">{t.footer.description}</p>
        </div>
        <div>
          <p className="eyebrow text-cream/45">{t.footer.navigate}</p>
          <ul className="mt-5 space-y-2.5">
            {items.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-underline text-[15px] text-cream/75 hover:text-cream">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-cream/45">{t.footer.workshop}</p>
          <address className="mt-5 space-y-1 text-[15px] not-italic leading-relaxed text-cream/75">
            <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer" className="block hover:text-cream">
              {site.address.street}
              <br />
              {site.address.district}
              <br />
              {site.address.city} · {site.address.zip} · {t.contact.country}
            </a>
            <p className="pt-4">
              <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer" className="link-underline hover:text-cream">
                {c.phone}
              </a>
              <span className="text-cream/45"> · Eliel</span>
            </p>
            <p>
              <a href={`https://wa.me/${c.ricardoWhatsapp}`} target="_blank" rel="noreferrer" className="link-underline hover:text-cream">
                {c.ricardoPhone}
              </a>
              <span className="text-cream/45"> · Ricardo</span>
            </p>
            <p>
              <a href={`mailto:${c.email}`} className="link-underline break-all hover:text-cream">
                {c.email}
              </a>
            </p>
            <p>
              <a href={c.instagramUrl} target="_blank" rel="noreferrer" className="link-underline hover:text-cream">
                @{c.instagram}
              </a>
            </p>
            <p>
              <a href={c.blogUrl} target="_blank" rel="noreferrer" className="link-underline break-all hover:text-cream">
                {t.contact.labels.blog}
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1320px] flex-wrap justify-between gap-3 px-6 py-6 text-[12.5px] text-cream/45 md:px-10">
          <span>
            © {site.name} {t.tagline} · {t.footer.rights}
          </span>
          <span className="serif text-[15px] italic">{t.footer.handmade}</span>
        </div>
      </div>
    </footer>
  );
}
