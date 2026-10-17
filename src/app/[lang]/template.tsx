/** Remonta a cada navegação: dá a entrada suave de cada página. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in flex flex-1 flex-col">{children}</div>;
}
