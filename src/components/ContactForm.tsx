"use client";

import { useState } from "react";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n/types";


/**
 * Formulário sem backend: monta a mensagem e abre o WhatsApp (ou o e-mail) já preenchido.
 */
export function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState(t.subjects[0]);
  const [message, setMessage] = useState("");

  const text = t.template.replace("{name}", name || "—").replace("{subject}", subject) + message;
  const ready = name.trim().length > 1 && message.trim().length > 4;

  const send = (via: "whatsapp" | "email") => {
    if (!ready) return;
    const url =
      via === "whatsapp"
        ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`
        : `mailto:${site.contact.email}?subject=${encodeURIComponent(`${subject} — ${name}`)}&body=${encodeURIComponent(text)}`;
    window.open(url, via === "whatsapp" ? "_blank" : "_self");
  };

  const field =
    "w-full border-0 border-b border-musgo/30 bg-transparent px-0 py-3 text-[17px] text-ink transition-colors duration-500 placeholder:text-mute/70 focus:border-musgo focus:outline-none focus:ring-0";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
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
        <button type="button" disabled={!ready} onClick={() => send("email")} className="eyebrow link-underline pb-1 text-soft hover:text-ink disabled:opacity-40">
          {t.sendEmail}
        </button>
      </div>
    </form>
  );
}
