import { ReactNode } from 'react';

interface StatItem {
  label: string;
  value: string;
}

interface CategoryHeroProps {
  icon?: string;
  title: string;
  subtitle: string;
  caption?: string;
  stats?: StatItem[];
  children?: ReactNode;
}

export default function CategoryHero({ icon, title, subtitle, caption, stats, children }: CategoryHeroProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 p-8 shadow-xl shadow-slate-950/30 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          {icon ? <div className="text-4xl mb-3">{icon}</div> : null}
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">{caption ?? 'Forecast Coverage'}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">{title}</h1>
          <p className="mt-3 max-w-2xl text-slate-400">{subtitle}</p>
        </div>
        {stats && stats.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-3 mt-6 md:mt-0">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
