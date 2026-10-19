import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/** /robots.txt: libera o site inteiro para todos os buscadores (Google, Bing, Yandex, Baidu, Naver…), menos a API. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
