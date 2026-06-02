import CategoryHero from '../components/CategoryHero';
import MarketGrid from '../components/MarketGrid';
import ForecastCard from '../components/ForecastCard';

const cards = [
  { title: 'Man City win EPL 2026-27?', category: 'Sports', percent: '72%', detail: 'probability', secondary: '8.2k forecasts', color: 'sky' },
  { title: 'Nigeria win AFCON 2027?', category: 'Sports', percent: '45%', detail: 'probability', secondary: '5.6k forecasts', color: 'emerald' },
  { title: "Vinícius Júnior win Ballon d'Or?", category: 'Sports', percent: '58%', detail: 'probability', secondary: '7.1k forecasts', color: 'yellow' },
];

export default function SportsPage() {
  return (
    <div className="p-8 space-y-6">
      <CategoryHero
        icon="⚽"
        title="Sports Markets"
        subtitle="Forecast outcomes from football, athletics, and major international sporting events."
        caption="Sports intelligence"
        stats={[
          { label: 'Markets tracked', value: '18' },
          { label: 'Active forecasts', value: '29k' },
          { label: 'Top accuracy', value: '77%' },
        ]}
      />

      <MarketGrid title="Featured sports forecasts" description="Browse the most popular sports outcomes being predicted right now.">
        {cards.map((card) => (
          <ForecastCard key={card.title} {...card} />
        ))}
      </MarketGrid>
    </div>
  );
}
