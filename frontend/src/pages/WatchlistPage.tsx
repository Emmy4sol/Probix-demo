import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForecastCard from '../components/ForecastCard';
import MarketGrid from '../components/MarketGrid';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import { fetchWatchlist, removeWatchlistItem } from '../services/watchlist';
import type { WatchlistItem } from '../types';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    async function loadWatchlist() {
      try {
        const items = await fetchWatchlist();
        if (active) setWatchlist(items);
      } catch (err) {
        setError('Unable to load your watchlist.');
      } finally {
        if (active) setLoading(false);
      }
    }
    loadWatchlist();
    return () => {
      active = false;
    };
  }, []);

  const handleUnfollow = async (marketId: string) => {
    setLoading(true);
    try {
      await removeWatchlistItem(marketId);
      setWatchlist((items) => items.filter((item) => item.marketId._id !== marketId));
    } catch (err) {
      setError('Unable to remove market from your watchlist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">⭐ Watchlist</h1>
        <p className="text-slate-400">Markets you're tracking.</p>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <EmptyState
          icon="⚠️"
          title="Watchlist unavailable"
          description={error}
          actionLabel="Reload"
          actionPath="/watchlist"
        />
      ) : watchlist.length === 0 ? (
        <EmptyState
          icon="⭐"
          title="Your watchlist is empty"
          description="Follow markets to track them in one place."
          actionLabel="Browse markets"
          actionPath="/markets"
        />
      ) : (
        <MarketGrid title="Tracked markets" description="Your selected markets are shown below. Stay on top of the forecasts you care about.">
          {watchlist.map((item) => (
            <ForecastCard
              key={item._id}
              title={item.marketId.title}
              category={item.marketId.category}
              percent={item.marketId.status === 'RESOLVED' ? 'Resolved' : item.marketId.status}
              detail={item.marketId.sourceName}
              secondary={new Date(item.marketId.closeDate).toLocaleDateString()}
              color={item.marketId.status === 'RESOLVED' ? 'emerald' : 'blue'}
              onClick={() => navigate(`/markets/${item.marketId.slug}`)}
              actionLabel="Unfollow"
              onAction={() => handleUnfollow(item.marketId._id)}
            />
          ))}
        </MarketGrid>
      )}
    </div>
  );
}
