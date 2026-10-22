import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/content/site";

/** Botão fixo no canto da tela, em todas as páginas: um toque e o cliente já está no WhatsApp da oficina. */
export function WhatsAppButton({ label }: { label: string }) {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-full bg-nogueira py-3.5 pl-3.5 pr-3.5 text-cream shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] ring-1 ring-cream/10 transition-all duration-500 hover:gap-3 hover:pr-5 md:bottom-8 md:right-8"
    >
      <MessageCircle aria-hidden className="size-6 shrink-0 text-ambar" strokeWidth={1.6} />
      <span className="eyebrow hidden max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-500 group-hover:max-w-[16rem] md:inline">
        {label}
      </span>
    </a>
  );
}
