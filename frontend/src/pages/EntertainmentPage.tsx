import CategoryHero from '../components/CategoryHero';
import MarketGrid from '../components/MarketGrid';
import ForecastCard from '../components/ForecastCard';

const cards = [
  { title: 'Burna Boy x Wizkid collab before 2027?', category: 'Entertainment', percent: '82%', detail: 'probability', secondary: '3.4k forecasts', color: 'pink' },
  { title: 'Olamide drop album in 2026?', category: 'Entertainment', percent: '76%', detail: 'probability', secondary: '2.8k forecasts', color: 'purple' },
  { title: 'Squid Game Season 2 top 5 Netflix?', category: 'Entertainment', percent: '91%', detail: 'probability', secondary: '6.9k forecasts', color: 'red' },
];

export default function EntertainmentPage() {
  return (
    <div className="p-8 space-y-6">
      <CategoryHero
        icon="🎤"
        title="Entertainment Markets"
        subtitle="Follow forecasts on music, film launches, celebrity outcomes, and pop culture buzz."
        caption="Culture forecasts"
        stats={[
          { label: 'Active markets', value: '21' },
          { label: 'Forecast volume', value: '18.5k' },
          { label: 'Community accuracy', value: '78%' },
        ]}
      />

      <MarketGrid title="Top entertainment forecasts" description="Browse the most popular entertainment markets and trending outcomes.">
        {cards.map((card) => (
          <ForecastCard key={card.title} {...card} />
        ))}
      </MarketGrid>
    </div>
  );
}
