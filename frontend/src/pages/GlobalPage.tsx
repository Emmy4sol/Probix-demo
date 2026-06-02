import CategoryHero from '../components/CategoryHero';
import MarketGrid from '../components/MarketGrid';
import ForecastCard from '../components/ForecastCard';

const cards = [
  { title: 'Global inflation falls below 4% in 2026', category: 'Economy', percent: '49%', detail: 'probability', secondary: '8.9k forecasts', color: 'emerald' },
  { title: 'G7 agree on carbon target by year-end', category: 'Politics', percent: '62%', detail: 'probability', secondary: '5.3k forecasts', color: 'purple' },
  { title: 'Global sports revenue grows 10% in 2026', category: 'Sports', percent: '71%', detail: 'probability', secondary: '4.7k forecasts', color: 'yellow' },
];

export default function GlobalPage() {
  return (
    <div className="p-8 space-y-6">
      <CategoryHero
        icon="🌐"
        title="Global Markets"
        subtitle="The highest-impact international markets across trade, policy, finance, and major sports outcomes."
        caption="Worldwide insights"
        stats={[
          { label: 'Global forecasts', value: '46' },
          { label: 'Forecast volume', value: '28.1k' },
          { label: 'Consensus accuracy', value: '75%' },
        ]}
      />

      <MarketGrid title="Global forecast highlights" description="Explore top-performing forecasts across international markets and geopolitical events.">
        {cards.map((card) => (
          <ForecastCard key={card.title} {...card} />
        ))}
      </MarketGrid>
    </div>
  );
}
