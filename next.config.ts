import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF quando o navegador aceita, WebP como reserva (o original fica para os muito antigos)
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // as fotos não mudam com frequência: deixa a versão otimizada em cache por 30 dias
    minimumCacheTTL: 2592000,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
