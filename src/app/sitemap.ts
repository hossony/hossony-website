import type { MetadataRoute } from "next";
import { gallery, photos, postCover, posts, team } from "@/content/site";
import { locales } from "@/i18n/config";
import { publicFileExists } from "@/lib/public-file";
import { alternates, pagePaths, siteUrl } from "@/lib/seo";

/** Fotos de cada página, para aparecerem também no Google Imagens. */
const pageImages: Record<string, string[]> = {
  "/sobre": [photos.aboutCover, photos.workshop, photos.bass, photos.cello],
  "/historia": [photos.history],
  "/colaboradores": [...team.map((m) => m.photo), photos.family],
  "/galeria": gallery.map((g) => g.src),
  "/contato": [photos.contact],
};

/** /sitemap.xml: todas as páginas nos 6 idiomas, com as versões equivalentes (hreflang) e as fotos. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ...pagePaths.map((path) => ({ path, date: undefined as string | undefined, images: pageImages[path] ?? [] })),
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, date: p.date, images: [postCover(p.slug)] })),
  ];
  return pages.flatMap(({ path, date, images }) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: date ?? new Date(),
      changeFrequency: path.startsWith("/blog/") ? ("yearly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/blog/") ? 0.6 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(alternates(lang, path)?.languages ?? {}).map(([tag, href]) => [tag, `${siteUrl}${href}`]),
        ),
      },
      images: images.filter(publicFileExists).map((src) => `${siteUrl}${src}`),
    })),
  );
}
