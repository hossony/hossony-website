import type { Instrument } from "@/content/site";

/**
 * Desenho técnico de um instrumento de arco (meia silhueta espelhada).
 * Aparece no lugar das fotos enquanto elas não existem, e como ornamento.
 */
const HALF =
  "M100 70 C 128 70 160 84 162 120 C 163 146 152 160 140 166 C 131 171 128 190 130 214 C 131 232 138 240 150 248 C 174 266 182 318 172 352 C 160 392 128 408 100 408";

/** Contrabaixo: ombros caídos, característica do instrumento. */
const HALF_BASS =
  "M100 70 C 110 72 118 82 126 98 C 138 122 158 134 160 160 C 161 178 148 186 140 194 C 131 203 128 216 130 230 C 132 242 140 248 152 256 C 176 274 184 320 174 354 C 162 394 128 410 100 410";

const SIZES: Record<Instrument, { scaleX: number; label: string; dim: string }> = {
  violino: { scaleX: 1, label: "Violino", dim: "356 MM" },
  viola: { scaleX: 1.07, label: "Viola", dim: "406 MM" },
  violoncelo: { scaleX: 1.2, label: "Violoncelo", dim: "755 MM" },
  contrabaixo: { scaleX: 1.3, label: "Contrabaixo", dim: "1110 MM" },
};

export function InstrumentDrawing({
  kind = "violino",
  className,
  showLabels = true,
  label,
}: {
  kind?: Instrument;
  className?: string;
  showLabels?: boolean;
  /** Nome traduzido do instrumento */
  label?: string;
}) {
  const s = SIZES[kind];
  const big = kind === "violoncelo" || kind === "contrabaixo";
  const body = kind === "contrabaixo" ? HALF_BASS : HALF;
  return (
    <svg viewBox="0 0 200 520" className={className} fill="none" aria-hidden>
      <g transform={`translate(100 260) scale(${s.scaleX}, 1) translate(-100 -260)`} stroke="currentColor" strokeLinecap="round">
        <path d="M100 6v506" strokeWidth="0.5" strokeDasharray="2 5" opacity="0.5" />
        <path d={body} strokeWidth="1" />
        <path d={body} strokeWidth="1" transform="translate(200 0) scale(-1 1)" />
        <path d={body} strokeWidth="0.4" opacity="0.5" transform="translate(100 239) scale(0.93) translate(-100 -239)" />
        <path d={body} strokeWidth="0.4" opacity="0.5" transform="translate(100 239) scale(-0.93 0.93) translate(-100 -239)" />
        <path d="M92 70 V 26 M108 70 V 26" strokeWidth="0.9" />
        <path d="M89 60 L 86 230 Q 100 238 114 230 L 111 60" strokeWidth="0.6" opacity="0.7" />
        <circle cx="100" cy="16" r="10" strokeWidth="0.9" />
        <path d="M100 16 m 0 -6 a 6 6 0 1 1 -5 9 a 3.5 3.5 0 1 1 4 -4" strokeWidth="0.6" />
        <path d="M78 232 c -6 10 6 18 0 30 c -4 8 -4 16 2 22" strokeWidth="0.9" />
        <path d="M122 232 c 6 10 -6 18 0 30 c 4 8 4 16 -2 22" strokeWidth="0.9" />
        <circle cx="78" cy="231" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="80" cy="285" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="122" cy="231" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="120" cy="285" r="1.6" fill="currentColor" stroke="none" />
        <path d="M84 262 h 32" strokeWidth="1.1" />
        <path d="M94 330 L 92 384 Q 100 392 108 384 L 106 330 Z" strokeWidth="0.7" />
        {big && <path d="M100 410 V 470" strokeWidth="1.2" />}
      </g>

      {showLabels && (
        <g fill="currentColor" opacity="0.7" fontFamily="var(--font-geist-sans), sans-serif" fontSize="7" letterSpacing="2">
          <text x="100" y="505" textAnchor="middle">
            {(label ?? s.label).toUpperCase()} · {s.dim}
          </text>
        </g>
      )}
    </svg>
  );
}

/** Os quatro instrumentos lado a lado, do violino ao contrabaixo — ilustração das faixas sem foto. */
export function InstrumentEnsemble({ className }: { className?: string }) {
  const order: { kind: Instrument; h: string }[] = [
    { kind: "violino", h: "44%" },
    { kind: "viola", h: "52%" },
    { kind: "violoncelo", h: "78%" },
    { kind: "contrabaixo", h: "100%" },
  ];
  return (
    <div className={`flex items-end justify-center gap-[3%] ${className ?? ""}`} aria-hidden>
      {order.map((o) => (
        <div key={o.kind} className="flex items-end" style={{ height: o.h }}>
          <InstrumentDrawing kind={o.kind} showLabels={false} className="h-full w-auto" />
        </div>
      ))}
    </div>
  );
}
