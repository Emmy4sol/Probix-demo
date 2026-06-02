import CategoryHero from '../components/CategoryHero';
import MarketGrid from '../components/MarketGrid';
import ForecastCard from '../components/ForecastCard';

const cards = [
  { title: 'Egg crate below ₦4,500 by July?', category: 'Economy', percent: '55%', detail: 'probability', secondary: '1.8k forecasts', color: 'emerald' },
  { title: 'Naira below ₦2,000/$ before Dec?', category: 'Economy', percent: '74%', detail: 'probability', secondary: '9.2k forecasts', color: 'yellow' },
  { title: 'Gas price drops below ₦15,000?', category: 'Economy', percent: '48%', detail: 'probability', secondary: '7.3k forecasts', color: 'blue' },
];

export default function EconomyPage() {
  return (
    <div className="p-8 space-y-6">
      <CategoryHero
        icon="🛒"
        title="Economy & Prices"
        subtitle="Track price forecasts for everyday goods, currency moves, and market-sensitive events."
        caption="Price intelligence"
        stats={[
          { label: 'Daily markets', value: '12' },
          { label: 'Forecasts', value: '21.6k' },
          { label: 'Average confidence', value: '68%' },
        ]}
      />

      <MarketGrid title="Price forecast markets" description="Forecast the next move for commodities, currency, and retail prices.">
        {cards.map((card) => (
          <ForecastCard key={card.title} {...card} />
        ))}
      </MarketGrid>
    </div>
  );
}
