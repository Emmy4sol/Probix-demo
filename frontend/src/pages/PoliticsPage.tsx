import CategoryHero from '../components/CategoryHero';
import MarketGrid from '../components/MarketGrid';
import ForecastCard from '../components/ForecastCard';

const cards = [
  { title: 'Will Peter Obi run in 2027?', category: 'Politics', percent: '61%', detail: 'probability', secondary: '2.1k forecasts', color: 'purple' },
  { title: 'Tinubu re-election 2027', category: 'Politics', percent: '48%', detail: 'probability', secondary: '12k forecasts', color: 'amber' },
  { title: 'Will APC retain Rivers State?', category: 'Politics', percent: '67%', detail: 'probability', secondary: '4.9k forecasts', color: 'blue' },
];

export default function PoliticsPage() {
  return (
    <div className="p-8 space-y-6">
      <CategoryHero
        icon="🇳🇬"
        title="Politics Markets"
        subtitle="Forecast the next chapter of Nigerian leadership, policy, and political power shifts."
        caption="Politics intelligence"
        stats={[
          { label: 'Active markets', value: '24' },
          { label: 'Forecasts', value: '15.7k' },
          { label: 'Avg accuracy', value: '71%' },
        ]}
      />

      <MarketGrid title="Top political forecasts" description="Explore the most active political markets in Nigeria today.">
        {cards.map((card) => (
          <ForecastCard key={card.title} {...card} />
        ))}
      </MarketGrid>
    </div>
  );
}
