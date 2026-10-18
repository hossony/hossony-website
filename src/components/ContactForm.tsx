"use client";

import { useState } from "react";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulário de contato: abre o WhatsApp já preenchido, ou envia por e-mail
 * direto para a oficina (rota /api/contact, via Resend).
 */
export function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState(t.subjects[0]);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const text = t.template.replace("{name}", name || "—").replace("{subject}", subject) + message;
  const ready = name.trim().length > 1 && message.trim().length > 4;
  const emailReady = ready && EMAIL_RE.test(email.trim()) && status !== "sending";

  const sendWhatsapp = () => {
    if (!ready) return;
    window.open(`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const sendEmail = async (website: string) => {
    if (!emailReady) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full border-0 border-b border-musgo/30 bg-transparent px-0 py-3 text-[17px] text-ink transition-colors duration-500 placeholder:text-mute/70 focus:border-musgo focus:outline-none focus:ring-0";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendWhatsapp();
      }}
      className="bg-tint-musgo p-8 md:p-12"
    >
      <p className="serif text-[30px] font-light leading-tight">{t.title}</p>
      <p className="mt-2 text-[14.5px] text-soft">{t.subtitle}</p>

      <div className="mt-10 space-y-8">
        <label className="block">
          <span className="eyebrow text-mute">{t.name}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" placeholder={t.namePlaceholder} className={field} />
        </label>

        <label className="block">
          <span className="eyebrow text-mute">{t.email}</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
            placeholder={t.emailPlaceholder}
            className={field}
          />
        </label>

        {/* armadilha para robôs: invisível para pessoas */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

        <fieldset>
          <legend className="eyebrow text-mute">{t.subject}</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {t.subjects.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setSubject(s)}
                aria-pressed={subject === s}
                className={`border px-4 py-2 text-[13.5px] transition-colors duration-500 ${
                  subject === s ? "border-musgo bg-musgo text-cream" : "border-musgo/30 text-soft hover:border-ink hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block">
          <span className="eyebrow text-mute">{t.message}</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            placeholder={t.messagePlaceholder}
            className={`${field} resize-none leading-relaxed`}
          />
        </label>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={!ready}
          className="eyebrow inline-flex h-14 items-center gap-4 bg-ink px-9 text-cream transition-colors duration-500 hover:bg-musgo disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.sendWhatsapp} <span aria-hidden>→</span>
        </button>
        <button
          type="button"
          disabled={!emailReady}
          onClick={(e) => sendEmail((e.currentTarget.form?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "")}
          className="eyebrow link-underline pb-1 text-soft hover:text-ink disabled:opacity-40"
        >
          {status === "sending" ? t.sending : t.sendEmail}
        </button>
      </div>
      <p aria-live="polite" className={`mt-6 min-h-[1.5em] text-[14.5px] ${status === "error" ? "text-bordo" : "text-musgo"}`}>
        {status === "sent" ? t.sent : status === "error" ? t.error : ""}
      </p>
    </form>
  );
}
