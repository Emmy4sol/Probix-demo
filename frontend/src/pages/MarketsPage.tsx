import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import CategoryHero from '../components/CategoryHero';
import MarketGrid from '../components/MarketGrid';
import MarketTabs from '../components/MarketTabs';
import ForecastCard from '../components/ForecastCard';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import { fetchMarkets } from '../services/market';
import { fetchWatchlist, addWatchlistItem, removeWatchlistItem } from '../services/watchlist';
import type { Market, WatchlistItem } from '../types';

export default function MarketsPage() {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [marketData, watchlistItems] = await Promise.all([
          fetchMarkets(),
          auth.user ? fetchWatchlist() : Promise.resolve([] as WatchlistItem[])
        ]);
        if (!active) return;
        setMarkets(marketData);
        if (auth.user) {
          setWatchlistIds(watchlistItems.map((item) => item.marketId._id));
        } else {
          setWatchlistIds([]);
        }
      } catch (err) {
        if (!active) return;
        setError('Unable to load market listings.');
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [auth.user]);

  const handleWatchToggle = async (marketId: string) => {
    if (!auth.user) {
      navigate('/login');
      return;
    }

    try {
      if (watchlistIds.includes(marketId)) {
        await removeWatchlistItem(marketId);
        setWatchlistIds((items) => items.filter((id) => id !== marketId));
      } else {
        await addWatchlistItem(marketId);
        setWatchlistIds((items) => [...items, marketId]);
      }
    } catch (err) {
      setError('Unable to update watchlist.');
    }
  };

  return (
    <div className="p-8 space-y-6">
      <CategoryHero
        icon="📈"
        title="Markets"
        subtitle="Browse active forecast markets and jump into the latest probability questions."
        caption="Market discovery"
        stats={[
          { label: 'Active markets', value: `${markets.length}` },
          { label: 'Open forecasts', value: 'Live' },
          { label: 'Community signals', value: 'Fast updates' },
        ]}
      />

      <MarketTabs
        tabs={markets.slice(0, 5).map((market) => ({
          id: market.slug,
          label: market.title.slice(0, 18),
          path: `/markets/${market.slug}`
        }))}
      />

      {loading ? (
        <LoadingState />
      ) : error ? (
        <EmptyState icon="⚠️" title="Market load failed" description={error} actionLabel="Retry" actionPath="/markets" />
      ) : markets.length === 0 ? (
        <EmptyState icon="📉" title="No markets found" description="There are no markets available yet." actionLabel="Refresh" actionPath="/markets" />
      ) : (
        <MarketGrid title="Explore active markets" description="Click any market to view details, submit a forecast, and follow the ones you care about.">
          {markets.map((market) => {
            const followed = watchlistIds.includes(market._id);
            return (
              <ForecastCard
                key={market._id}
                title={market.title}
                category={market.category}
                percent={market.status === 'RESOLVED' ? 'Resolved' : 'Open'}
                detail={market.sourceName}
                secondary={new Date(market.closeDate).toLocaleDateString()}
                color={market.status === 'RESOLVED' ? 'emerald' : 'blue'}
                onClick={() => navigate(`/markets/${market.slug}`)}
                actionLabel={auth.user ? (followed ? 'Unfollow' : 'Follow') : 'Login to follow'}
                onAction={() => handleWatchToggle(market._id)}
              />
            );
          })}
        </MarketGrid>
      )}
    </div>
  );
}
