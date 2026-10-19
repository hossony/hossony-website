/**
 * Dados que NÃO mudam com o idioma: contatos, endereço, fotos, cores das peças, equipe.
 * Os textos traduzidos ficam em src/i18n/locales/*.ts.
 */

export const site = {
  name: "Hossony",
  founded: 1989,
  contact: {
    email: "eliel-luthier@hotmail.com",
    phone: "+55 14 99680-4141",
    phoneHref: "tel:+5514996804141",
    whatsapp: "5514996804141", // só números, com DDI e DDD
    instagram: "luthiereliel",
    instagramUrl: "https://www.instagram.com/luthiereliel/",
  },
  address: {
    street: "Rua Engenheiro Bernardo Martins Júnior, 25",
    district: "Vila Amélia",
    city: "Taquarituba · SP",
    zip: "18743-082",
  },
};

const mapsQuery = encodeURIComponent(
  `${site.address.street} - ${site.address.district}, Taquarituba - SP, ${site.address.zip}, Brasil`,
);
/** Abre o Google Maps já traçando a rota até a oficina. */
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
/** Mapa incorporado (não precisa de chave de API). */
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&z=16&output=embed`;

/**
 * Capa da home. Coloque os arquivos em /public com estes nomes:
 *  - logo:       a logo em PNG (de preferência com fundo transparente)
 *  - background: a foto de fundo da capa (JPG, 2400px de largura é o ideal)
 */
export const hero = {
  logo: "/logo.png",
  background: "/hero1.jpg",
  /** "escuro" escurece a foto (para logo clara); "claro" clareia a foto (para logo escura) */
  overlay: "escuro" as "escuro" | "claro",
};

/**
 * Fotos das páginas. Salve os arquivos em /public/fotos com estes nomes.
 * Enquanto uma foto não existir, aparece uma ilustração dos instrumentos no lugar.
 */
export const photos = {
  aboutCover: "/fotos/sobre-capa.jpg", // capa do Sobre (oficina) — horizontal, 2400px
  workshop: "/fotos/oficina-bancada.jpg", // bancada / ferramentas — vertical
  bass: "/fotos/contrabaixo3.jpg", // contrabaixo em destaque — vertical
  cello: "/fotos/cello2.jpg", // violoncelo em destaque — vertical
  history: "/fotos/historia.jpg", // foto antiga ou da oficina — horizontal
  family: "/fotos/familia.jpg", // pai e filhos na oficina — horizontal
  galleryCover: "/fotos/galeria.jpg", // instrumentos reunidos — horizontal
  journalCover: "/fotos/diario.jpg", // detalhe de madeira, verniz… — horizontal
  contact: "/fotos/contato.jpg", // fachada ou interior da oficina — horizontal
};

export type Instrument = "violino" | "viola" | "violoncelo" | "contrabaixo";

/** Contador de instrumentos fabricados (página Sobre). O "+" é acrescentado na tela. */
export const made: { kind: Instrument; count: number }[] = [
  { kind: "violino", count: 3000 },
  { kind: "contrabaixo", count: 140 },
  { kind: "violoncelo", count: 250 },
  { kind: "viola", count: 230 },
];

/** Colaboradores. Fotos em /public/equipe (retrato vertical, ~1200×1500). */
export const team = [
  { id: "eliel", name: "Eliel Marcos de Almeida", initials: "EM", photo: "/equipe/eliel-marcos-de-almeida.jpg", tone: "#8c4a22" },
  { id: "ricardo", name: "Ricardo Marcos", initials: "RM", photo: "/equipe/ricardo-marcos.jpg", tone: "#46604b" },
] as const;
export type TeamId = (typeof team)[number]["id"];

/** Para adicionar uma peça: inclua o id aqui, no array abaixo e nos 6 idiomas (gallery.items). */
export type GalleryId = "contrabaixo-1" | "violoncelo-1" | "violino-1" | "viola-1";

export interface GalleryPiece {
  id: GalleryId;
  kind: Instrument;
  /** Cor aproximada da peça (hex): amostra, desenho e fundo da ficha */
  tone: string;
  /** Foto em /public, ex.: "/galeria/contrabaixo-1.jpg" */
  src: string;
}

export const gallery: GalleryPiece[] = [
  { id: "contrabaixo-1", kind: "contrabaixo", tone: "#8f4f2c", src: "/galeria/contrabaixo3.jpg" },
  { id: "violoncelo-1", kind: "violoncelo", tone: "#5e2b1d", src: "/galeria/cello2.jpg" },
  { id: "violino-1", kind: "violino", tone: "#8f4f2c", src: "/galeria/violino.jpg" },
  { id: "viola-1", kind: "viola", tone: "#4a270b", src: "/galeria/viola.png" },
];

/** Diário: slug, data, instrumento da ilustração e foto de capa (public/blog/<slug>.jpg). */
export const posts = [
  { slug: "por-que-a-madeira-precisa-descansar", date: "2026-09-12", kind: "violoncelo", tone: "#8a4426" },
  { slug: "a-alma-do-instrumento", date: "2026-08-03", kind: "violino", tone: "#b5832c" },
  { slug: "cuidados-no-tempo-seco", date: "2026-06-20", kind: "contrabaixo", tone: "#5f3522" },
] as const satisfies readonly { slug: string; date: string; kind: Instrument; tone: string }[];
export type PostSlug = (typeof posts)[number]["slug"];
export const postCover = (slug: string) => `/blog/${slug}.jpg`;
