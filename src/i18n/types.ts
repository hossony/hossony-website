import type { GalleryId, Instrument, PostSlug, TeamId } from "@/content/site";

/** Título com uma palavra em destaque: [antes, destaque, depois] */
export type Rich = readonly [string, string, string];

interface Item {
  title: string;
  text: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    /** Termos de busca (Bing, Yandex, Baidu e o JSON-LD; o Google lê o texto da página). */
    keywords: string[];
  };
  tagline: string;
  /** "Desde 1989" */
  since: string;
  nav: {
    home: string;
    about: string;
    history: string;
    team: string;
    gallery: string;
    journal: string;
    contact: string;
    menu: string;
    close: string;
    language: string;
  };
  hero: { tagline: string; place: string; discover: string };
  footer: { description: string; navigate: string; workshop: string; rights: string; handmade: string };
  cta: { eyebrow: string; title: Rich; button: string };
  /** Textos alternativos das fotos (acessibilidade e Google) */
  alt: {
    aboutCover: string;
    workshop: string;
    bass: string;
    cello: string;
    history: string;
    family: string;
    galleryCover: string;
    journalCover: string;
    contact: string;
  };

  about: {
    eyebrow: string;
    title: Rich;
    intro: string;
    body: string;
    facts: { value: string; label: string }[];
    madeEyebrow: string;
    madeTitle: string;
    /** Nomes no plural, para o contador de instrumentos fabricados */
    madeKinds: Record<Instrument, string>;
    servicesEyebrow: string;
    servicesTitle: string;
    services: Item[];
    specialtyEyebrow: string;
    specialtyTitle: Rich;
    specialtyText: string;
    specialtyPoints: string[];
    principlesEyebrow: string;
    principlesTitle: Rich;
    principles: Item[];
  };
  history: {
    eyebrow: string;
    title: Rich;
    intro: string;
    steps: { era: string; title: string; text: string }[];
    nameEyebrow: string;
    nameTitle: Rich;
    nameText: string;
    quote: string;
    quoteSource: string;
  };
  team: {
    eyebrow: string;
    title: Rich;
    intro: string;
    members: Record<TeamId, { role: string; bio: string }>;
    traditionEyebrow: string;
    traditionTitle: Rich;
    tradition: string[];
    sealEyebrow: string;
    sealTitle: Rich;
    sealPoints: Item[];
    labelCaption: string;
  };
  gallery: {
    eyebrow: string;
    title: Rich;
    intro: string;
    kinds: Record<Instrument, string>;
    specs: { model: string; color: string; varnish: string; wood: string; size: string; inspired: string; accessories: string };
    consult: string;
    items: Record<
      GalleryId,
      {
        name: string;
        description: string;
        color: string;
        varnish: string;
        /** Opcional: aparece na ficha só quando preenchido */
        wood?: string;
        /** Opcional, ex.: "43 cm" */
        size?: string;
        inspiredBy: string;
        accessories: string[];
      }
    >;
  };
  journal: {
    eyebrow: string;
    title: Rich;
    latest: string;
    read: string;
    more: string;
    back: string;
    posts: Record<PostSlug, { title: string; excerpt: string; body: string[] }>;
  };
  contact: {
    eyebrow: string;
    title: Rich;
    intro: string;
    labels: { phone: string; email: string; instagram: string; address: string };
    country: string;
    directions: string;
    visit: string;
    mapTitle: string;
    form: {
      title: string;
      subtitle: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjects: string[];
      message: string;
      messagePlaceholder: string;
      sendWhatsapp: string;
      sendEmail: string;
      /** Use {name} e {subject} */
      template: string;
      sending: string;
      sent: string;
      error: string;
    };
  };
  notFound: { eyebrow: string; title: Rich; back: string };
}
