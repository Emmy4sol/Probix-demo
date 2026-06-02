import CategoryHero from '../components/CategoryHero';
import MarketGrid from '../components/MarketGrid';
import ForecastCard from '../components/ForecastCard';

const cards = [
  { title: 'Will Peter Obi run in 2027?', category: 'Politics', percent: '61%', detail: 'probability', secondary: '2.1k forecasts', color: 'purple' },
  { title: 'Lagos gubernatorial election 2026', category: 'Politics', percent: '53%', detail: 'probability', secondary: '6.3k forecasts', color: 'blue' },
  { title: 'Naira below ₦2,000/$ before Dec 2026', category: 'Economy', percent: '74%', detail: 'probability', secondary: '9.2k forecasts', color: 'emerald' },
];

export default function NigeriaPage() {
  return (
    <div className="p-8 space-y-6">
      <CategoryHero
        icon="🇳🇬"
        title="Nigeria Markets"
        subtitle="Top forecasts for Nigeria’s politics, prices, and economy. Stay ahead of the country’s most important outcomes."
        caption="Regional intelligence"
        stats={[
          { label: 'Active markets', value: '38' },
          { label: 'Community forecasts', value: '24.8k' },
          { label: 'Recent accuracy', value: '79%' },
        ]}
      />

      <MarketGrid title="Featured Nigeria forecasts" description="Explore our most active Nigeria markets with market-leading confidence scores.">
        {cards.map((card) => (
          <ForecastCard key={card.title} {...card} />
        ))}
      </MarketGrid>
    </div>
  );
}
