import CategoryHero from '../components/CategoryHero';
import MarketGrid from '../components/MarketGrid';
import ForecastCard from '../components/ForecastCard';

const cards = [
  { title: 'South Africa election before 2026?', category: 'Politics', percent: '58%', detail: 'probability', secondary: '7.4k forecasts', color: 'blue' },
  { title: 'Africa GDP growth above 4% in 2026', category: 'Economy', percent: '67%', detail: 'probability', secondary: '4.8k forecasts', color: 'emerald' },
  { title: 'Africa Cup of Nations host selected', category: 'Sports', percent: '81%', detail: 'probability', secondary: '5.9k forecasts', color: 'yellow' },
];

export default function AfricaPage() {
  return (
    <div className="p-8 space-y-6">
      <CategoryHero
        icon="🌍"
        title="Africa Markets"
        subtitle="Forecasting pan-African political, economic, and sports dynamics with the latest community intelligence."
        caption="Continent-wide coverage"
        stats={[
          { label: 'Featured markets', value: '42' },
          { label: 'Forecast contributions', value: '31.2k' },
          { label: 'Avg accuracy', value: '77%' },
        ]}
      />

      <MarketGrid title="Trending Africa forecasts" description="Browse our most-discussed continental markets across governance, trade, and major events.">
        {cards.map((card) => (
          <ForecastCard key={card.title} {...card} />
        ))}
      </MarketGrid>
    </div>
  );
}
