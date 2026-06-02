import CategoryHero from '../components/CategoryHero';
import MarketGrid from '../components/MarketGrid';
import ForecastCard from '../components/ForecastCard';

export default function WeatherPage() {
  return (
    <div className="p-8 space-y-6">
      <CategoryHero
        icon="☀️"
        title="Weather Markets"
        subtitle="Forecast key weather events across Nigeria with confidence from our community models."
        caption="Weather intelligence"
        stats={[
          { label: 'Active forecasts', value: '14' },
          { label: 'Community predictions', value: '8.7k' },
          { label: 'Market confidence', value: '71%' },
        ]}
      />

      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-cyan-700/30 rounded-3xl p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Port Harcourt</h2>
            <div className="flex items-baseline gap-3">
              <div className="text-7xl">🌧️</div>
              <div>
                <div className="text-5xl font-light">28°C</div>
                <p className="text-slate-400 mt-1">Thunderstorms likely</p>
              </div>
            </div>
          </div>
          <div className="text-right space-y-3">
            <div>
              <p className="text-sm text-slate-400">Humidity</p>
              <p className="text-2xl font-semibold">88%</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Wind</p>
              <p className="text-2xl font-semibold">14 km/h</p>
            </div>
          </div>
        </div>
      </div>

      <MarketGrid title="Weather forecasts" description="Current atmosphere and precipitation probabilities for major Nigerian locations.">
        <ForecastCard
          title="Rain in Lagos before June 15?"
          category="Weather"
          percent="89%"
          detail="probability"
          secondary="3.2k forecasts"
          color="blue"
        />
        <ForecastCard
          title="Temperature above 35°C in June?"
          category="Weather"
          percent="72%"
          detail="probability"
          secondary="2.1k forecasts"
          color="red"
        />
      </MarketGrid>
    </div>
  );
}
