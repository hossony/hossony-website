import { Resend } from "resend";
import { site } from "@/content/site";

/**
 * Recebe o formulário de contato e envia para o e-mail da oficina pelo Resend.
 * Variáveis de ambiente (Vercel → Settings → Environment Variables):
 *  - RESEND_API_KEY  (obrigatória; a integração Resend da Vercel já cria)
 *  - CONTACT_FROM    (opcional; ex.: "Hossony <contato@seudominio.com.br>" depois de verificar o domínio no Resend)
 *  - CONTACT_TO      (opcional; padrão: site.contact.email)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ ok: false }, { status: 400 });

  // campo invisível: só robôs preenchem
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 120);
  const message = clean(body.message, 5000);
  if (name.length < 2 || message.length < 5 || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contato] RESEND_API_KEY não configurada");
    return Response.json({ ok: false }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM || `${site.name} <onboarding@resend.dev>`,
    to: process.env.CONTACT_TO || site.contact.email,
    replyTo: email,
    subject: `[Site] ${subject} — ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\n\n${message}`,
    html: `<p><strong>Nome:</strong> ${escapeHtml(name)}<br><strong>E-mail:</strong> ${escapeHtml(email)}<br><strong>Assunto:</strong> ${escapeHtml(subject)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });

  if (error) {
    console.error("[contato] falha no Resend:", error);
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
