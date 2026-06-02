import HeroParallax from '../components/HeroParallax';
import MarketGrid from '../components/MarketGrid';
import ForecastCard from '../components/ForecastCard';

export default function HomePage() {
  return (
    <div className="p-8">
      {/* Hero Section with HeroParallax - ORIGINAL RESTORED */}
      <div className="rounded-3xl min-h-[30rem] p-6 md:p-10 mb-10 overflow-hidden pointer-events-auto bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <HeroParallax />
        <div className="relative z-10 grid h-full gap-8 lg:grid-cols-[1.6fr_minmax(280px,1fr)] items-end">
          <div className="self-end">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              The future isn't guessed.<br />
              It's <span className="text-blue-400">forecasted</span>.
            </h1>
          </div>
          <div className="rounded-3xl bg-black/70 glass p-6 md:p-8 max-w-full">
            <div className="text-emerald-400 text-6xl font-mono">74%</div>
            <p className="text-xl">Naira below ₦2,000/$ before Dec 2026</p>
          </div>
        </div>
      </div>

      {/* Trending Section - ORIGINAL RESTORED */}
      <MarketGrid title="🔥 Trending in Nigeria" description="These markets are driving the most forecast activity today.">
        <ForecastCard title="Will Peter Obi run in 2027?" category="Politics" percent="61%" detail="YES" color="purple" secondary="2.1k forecasts" />
        <ForecastCard title="Burna Boy x Wizkid collab before 2027?" category="Entertainment" percent="82%" detail="YES" color="pink" secondary="3.4k forecasts" />
        <ForecastCard title="Egg crate below ₦4,500 by July?" category="Economy" percent="55%" detail="YES" color="emerald" secondary="1.8k forecasts" />
      </MarketGrid>
    </div>
  );
}
