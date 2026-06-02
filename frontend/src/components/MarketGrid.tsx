import { ReactNode } from 'react';

interface MarketGridProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function MarketGrid({ title, description, children }: MarketGridProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          {description ? <p className="text-slate-400 mt-2 max-w-xl">{description}</p> : null}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">{children}</div>
    </section>
  );
}
