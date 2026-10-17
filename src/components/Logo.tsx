/**
 * Logo provisória da Hossony (monograma + nome), usada só enquanto não existir /public/logo.png.
 * A logo real em PNG é configurada em `hero` (src/content/site.ts).
 */
export function Logo({ animated = false, tagline = "Luteria" }: { animated?: boolean; tagline?: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <svg viewBox="0 0 220 220" className="h-auto w-[150px] sm:w-[190px]" aria-hidden>
        <circle cx="110" cy="110" r="104" fill="none" stroke="currentColor" strokeWidth="0.8" className={animated ? "ring-draw" : ""} />
        <circle
          cx="110"
          cy="110"
          r="96"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="1 4"
          opacity="0.6"
          className={animated ? "fade" : ""}
          style={{ ["--delay" as string]: "900ms" }}
        />
        <text
          x="110"
          y="138"
          textAnchor="middle"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="104"
          fontStyle="italic"
          fontWeight="300"
          fill="currentColor"
          className={animated ? "fade" : ""}
          style={{ ["--delay" as string]: "500ms" }}
        >
          H
        </text>
        {/* pequena voluta estilizada */}
        <path
          d="M110 160 c 10 0 14 8 8 13 c -5 4 -12 0 -9 -5 c 2 -3 6 -2 6 1"
          fill="none"
          stroke="var(--color-varnish)"
          strokeWidth="1"
          strokeLinecap="round"
          className={animated ? "fade" : ""}
          style={{ ["--delay" as string]: "1300ms" }}
        />
      </svg>

      <p
        className={`serif mt-8 text-[44px] font-light leading-none tracking-[0.34em] pl-[0.34em] sm:text-[60px] ${animated ? "fade-up" : ""}`}
        style={{ ["--delay" as string]: "700ms" } as React.CSSProperties}
      >
        HOSSONY
      </p>
      <div
        className={`mt-5 flex items-center gap-4 ${animated ? "fade-up" : ""}`}
        style={{ ["--delay" as string]: "1000ms" } as React.CSSProperties}
      >
        <span className="h-px w-10 bg-line-2" />
        <span className="eyebrow text-varnish">{tagline}</span>
        <span className="h-px w-10 bg-line-2" />
      </div>
    </div>
  );
}
