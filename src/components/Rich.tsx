import type { Rich as RichParts } from "@/i18n/types";

/** Renderiza um título traduzido com uma palavra em itálico de destaque. */
export function Rich({ parts, accent = "text-varnish" }: { parts: RichParts; accent?: string }) {
  const [before, em, after] = parts;
  return (
    <>
      {before}
      <em className={`italic ${accent}`}>{em}</em>
      {after}
    </>
  );
}
