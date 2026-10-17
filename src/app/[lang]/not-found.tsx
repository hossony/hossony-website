import Link from "next/link";
import { Rich } from "@/components/Rich";
import { dictionaries } from "@/i18n";
import { defaultLocale } from "@/i18n/config";

export default function NotFound() {
  const t = dictionaries[defaultLocale];
  return (
    <main className="flex min-h-[100svh] flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow text-varnish">{t.notFound.eyebrow}</p>
      <h1 className="serif mt-6 text-[56px] font-light leading-none md:text-[88px]">
        <Rich parts={t.notFound.title} />
      </h1>
      <Link href={`/${defaultLocale}`} className="eyebrow link-underline mt-12 pb-1 text-ink">
        {t.notFound.back}
      </Link>
    </main>
  );
}
