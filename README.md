# Hossony — Luteria desde 1989

Site da luteria Hossony (Taquarituba, SP), em Next.js com Tailwind e estilo editorial claro, em **6 idiomas**: português, italiano, inglês, francês, espanhol e alemão.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera o site para publicação
```

## Publicar na Vercel

1. Suba a pasta para um repositório no GitHub.
2. Em vercel.com, escolha **Add New → Project**, importe o repositório e clique em **Deploy**. Não é preciso configurar nada.
3. Para usar um domínio próprio (ex.: hossony.com.br), adicione-o em **Settings → Domains**.

## Fotos: onde colocar cada uma

Basta salvar os arquivos com estes nomes. O site detecta as fotos no build, sem mexer em código. Enquanto uma foto não existir, aparece no lugar uma ilustração dos instrumentos.

| Página | Arquivo | Formato ideal |
|---|---|---|
| Início, logo | `public/logo.png` | PNG com fundo transparente |
| Início, fundo | `public/hero.jpg` | horizontal, 2400px |
| Sobre, capa | `public/fotos/sobre-capa.jpg` | horizontal, 2400px (oficina) |
| Sobre, introdução | `public/fotos/oficina-bancada.jpg` | vertical 4:5 |
| Sobre, especialidade | `public/fotos/contrabaixo.jpg` e `public/fotos/violoncelo.jpg` | vertical 3:5 |
| História | `public/fotos/historia.jpg` | horizontal 21:9 |
| Colaboradores | `public/equipe/elielluthier.jpg` e `public/equipe/ricardo.jpg` | retrato 4:5 |
| Colaboradores | `public/fotos/familia.jpg` | horizontal 21:9 |
| Galeria | `public/galeria/contrabaixo-1.jpg`, `violoncelo-1.jpg`, `violino-1.jpg`, `viola-1.jpg` | vertical 4:5 |
| Diário | `public/fotos/diario.jpg` + `public/blog/<slug-do-artigo>.jpg` | horizontal |
| Contato | `public/fotos/contato.jpg` | horizontal 21:9 |

Comprima as fotos antes de subir, por exemplo em squoosh.app (JPG com qualidade 80 e no máximo 2400px de largura), para o site carregar rápido.

## Onde editar

- **Contato, endereço, Instagram** → `src/content/site.ts`
- **Textos** (história, sobre, catálogo, diário…) → `src/i18n/locales/{pt,it,en,fr,es,de}.ts`. Todos os idiomas têm a mesma estrutura, e o TypeScript avisa se faltar algum texto em algum deles.
- **Catálogo**: os 4 instrumentos são exemplos (cor, verniz, referência, acessórios). Substitua pelos instrumentos reais nos 6 idiomas. Para adicionar uma peça, inclua o `id` em `GalleryId` e em `gallery` (site.ts) e depois os textos em `gallery.items` de cada idioma.
- **Capa da home**: em `hero.overlay` (site.ts), use `"escuro"` para logo clara sobre a foto, ou `"claro"` para logo escura.

## Idiomas

- As rotas têm prefixo de idioma: `/pt`, `/it`, `/en`, `/fr`, `/es`, `/de`.
- Em `/`, o visitante é levado ao idioma escolhido antes ou ao idioma do navegador. Se nenhum for suportado, cai em português.
- No computador, o seletor fica no menu (PT ▾). No celular, fica dentro do menu aberto.

## Contato

- "Como chegar" abre o Google Maps já com a rota até a oficina.
- O mapa da página de contato é o Google Maps incorporado e não precisa de chave de API.
- O formulário não precisa de servidor: abre o WhatsApp (14 99680-4141) ou o e-mail já com a mensagem pronta.

## SEO (Google, Bing e buscadores do mundo todo)

- **Domínio**: o site usa `https://hossony.com` no canonical, no sitemap, no Open Graph e nos dados estruturados (`src/lib/seo.tsx`). Para trocar sem mexer no código, crie `NEXT_PUBLIC_SITE_URL` na Vercel em **Settings → Environment Variables** e publique de novo.
- **Sitemap e robots**: gerados sozinhos em `/sitemap.xml` (todas as páginas nos 6 idiomas, com hreflang e fotos) e `/robots.txt`.
- **Idiomas**: cada página indica ao Google as versões nos outros idiomas (`hreflang`). O português vale para Brasil e demais países lusófonos; os outros idiomas valem em qualquer país (inglês nos EUA, espanhol no México e na Argentina etc.).
- **Dados estruturados** (schema.org): oficina (endereço, telefone, Instagram, instrumentos), site, trilha de navegação e artigos do diário.
- **Palavras-chave e títulos**: em `meta` de cada idioma (`src/i18n/locales/*.ts`).
- **Depois de publicar**: cadastre o site no [Google Search Console](https://search.google.com/search-console) e no [Bing Webmaster Tools](https://www.bing.com/webmasters) e envie o `/sitemap.xml`. Crie também o perfil da oficina no [Google Meu Negócio](https://business.google.com) com o mesmo endereço e telefone — é o que mais pesa nas buscas locais ("luthier perto de mim").
