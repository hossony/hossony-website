import type { ReactNode } from "react";

/** Cabeçalho editorial padrão das páginas internas. */
export function PageHeader({ index, eyebrow, title, intro }: { index: string; eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <header className="mx-auto w-full max-w-[1320px] px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
      <div className="fade-up flex items-center gap-4" style={{ ["--delay" as string]: "100ms" } as React.CSSProperties}>
        <span className="serif text-[18px] italic text-varnish">{index}</span>
        <span className="h-px w-12 bg-line-2" />
        <span className="eyebrow text-mute">{eyebrow}</span>
      </div>
      <h1
        className="serif fade-up mt-8 max-w-5xl text-[54px] font-light leading-[0.98] tracking-[-0.01em] text-balance sm:text-[76px] lg:text-[104px]"
        style={{ ["--delay" as string]: "250ms" } as React.CSSProperties}
      >
        {title}
      </h1>
      {intro && (
        <p
          className="fade-up mt-10 max-w-2xl text-[17px] leading-[1.75] text-soft md:text-[18px]"
          style={{ ["--delay" as string]: "450ms" } as React.CSSProperties}
        >
          {intro}
        </p>
      )}
    </header>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-6 md:px-10 ${className ?? ""}`}>{children}</div>;
}
