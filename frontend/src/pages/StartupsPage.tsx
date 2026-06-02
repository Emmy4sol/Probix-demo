import CategoryHero from '../components/CategoryHero';
import MarketGrid from '../components/MarketGrid';
import ForecastCard from '../components/ForecastCard';

const cards = [
  { title: 'Next unicorn in Africa by 2027?', category: 'Startups', percent: '64%', detail: 'probability', secondary: '3.2k forecasts', color: 'pink' },
  { title: 'Startup funding above $100M in 2026?', category: 'Finance', percent: '58%', detail: 'probability', secondary: '2.9k forecasts', color: 'emerald' },
  { title: 'Blockchain adoption by major banks', category: 'Startups', percent: '53%', detail: 'probability', secondary: '4.1k forecasts', color: 'blue' },
];

export default function StartupsPage() {
  return (
    <div className="p-8 space-y-6">
      <CategoryHero
        icon="🚀"
        title="Startups Markets"
        subtitle="Forecast emerging venture outcomes, funding milestones, and disruptive startup momentum."
        caption="Innovation forecasting"
        stats={[
          { label: 'Startup markets', value: '18' },
          { label: 'Community activity', value: '12.4k' },
          { label: 'Prediction accuracy', value: '73%' },
        ]}
      />

      <MarketGrid title="Startup market forecasts" description="Navigate the latest startup bets in Africa, global VC, and emerging tech ventures.">
        {cards.map((card) => (
          <ForecastCard key={card.title} {...card} />
        ))}
      </MarketGrid>
    </div>
  );
}
