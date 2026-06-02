import CategoryHero from '../components/CategoryHero';
import MarketGrid from '../components/MarketGrid';
import ForecastCard from '../components/ForecastCard';

const cards = [
  { title: 'Apple unveil AR headset in 2026?', category: 'Technology', percent: '69%', detail: 'probability', secondary: '8.6k forecasts', color: 'sky' },
  { title: 'Bitcoin above $100k by year-end', category: 'Crypto', percent: '52%', detail: 'probability', secondary: '10.1k forecasts', color: 'purple' },
  { title: 'AI regulation bill passes in the EU', category: 'Technology', percent: '76%', detail: 'probability', secondary: '6.8k forecasts', color: 'blue' },
];

export default function TechnologyPage() {
  return (
    <div className="p-8 space-y-6">
      <CategoryHero
        icon="💻"
        title="Technology Markets"
        subtitle="Live forecasts on technology product launches, crypto movements, and the next era of AI regulation."
        caption="Tech foresight"
        stats={[
          { label: 'Active tech markets', value: '29' },
          { label: 'Forecast volumes', value: '19.7k' },
          { label: 'Avg consensus', value: '68%' },
        ]}
      />

      <MarketGrid title="Highlighted technology markets" description="Track technology events shaping the next wave of digital markets.">
        {cards.map((card) => (
          <ForecastCard key={card.title} {...card} />
        ))}
      </MarketGrid>
    </div>
  );
}
