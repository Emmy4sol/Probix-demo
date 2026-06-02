import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchMarketBySlug } from '../services/market';
import { fetchForecastsForMarket, submitForecast } from '../services/forecast';
import { fetchWatchlist, addWatchlistItem, removeWatchlistItem } from '../services/watchlist';
import { refreshSession } from '../features/auth/authSlice';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import type { Market, Forecast, WatchlistItem } from '../types';

export default function MarketPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const [market, setMarket] = useState<Market | null>(null);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  const [probability, setProbability] = useState(50);
  const [confidence, setConfidence] = useState(50);
  const [position, setPosition] = useState<'YES' | 'NO'>('YES');
  const [reasoning, setReasoning] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const isWatchlisted = !!market && watchlistIds.includes(market._id);

  useEffect(() => {
    let active = true;

    async function loadMarket() {
      if (!slug) return;
      setLoading(true);
      setError('');

      try {
        const marketData = await fetchMarketBySlug(slug);
        if (!active) return;
        setMarket(marketData);
        const forecastData = await fetchForecastsForMarket(marketData._id);
        if (!active) return;
        setForecasts(forecastData);

        if (auth.user) {
          const watchlistItems = await fetchWatchlist();
          if (!active) return;
          setWatchlistIds(watchlistItems.map((item) => item.marketId._id));
        }
      } catch (err: any) {
        if (!active) return;
        setError(err?.message ?? 'Unable to load market details.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMarket();
    return () => {
      active = false;
    };
  }, [slug, auth.user]);

  const handleWatchlistToggle = async () => {
    if (!market) return;
    if (!auth.user) {
      navigate('/login');
      return;
    }

    setWatchlistLoading(true);
    try {
      if (isWatchlisted) {
        await removeWatchlistItem(market._id);
        setWatchlistIds((ids) => ids.filter((id) => id !== market._id));
      } else {
        await addWatchlistItem(market._id);
        setWatchlistIds((ids) => [...ids, market._id]);
      }
    } catch (err) {
      setError('Unable to update your watchlist.');
    } finally {
      setWatchlistLoading(false);
    }
  };

  const handleSubmitForecast = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!market) return;

    if (!auth.user) {
      navigate('/login');
      return;
    }

    setFormError('');
    setFormSuccess('');
    setSubmitting(true);

    try {
      const created = await submitForecast({
        marketId: market._id,
        probability,
        confidence,
        position,
        reasoning
      });
      setForecasts((current) => [created, ...current]);
      setFormSuccess('Forecast saved successfully.');
      setReasoning('');
      await dispatch(refreshSession());
    } catch (err: any) {
      setFormError(typeof err === 'string' ? err : err?.message ?? 'Unable to save your forecast.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeDate = useMemo(() => (market ? new Date(market.closeDate).toLocaleString() : ''), [market]);
  const resolveDate = useMemo(() => (market ? new Date(market.resolveDate).toLocaleString() : ''), [market]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !market) {
    return (
      <div className="p-8">
        <EmptyState icon="⚠️" title="Market not available" description={error || 'No market was found for this page.'} actionLabel="Back to markets" actionPath="/markets" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Forecast market</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">{market.title}</h1>
          <p className="mt-3 text-slate-400 max-w-2xl">{market.description}</p>
        </div>
        <div className="space-y-3 text-right">
          <div className="rounded-3xl bg-slate-900 px-4 py-3 text-slate-300">Status: {market.status}</div>
          <button
            type="button"
            onClick={handleWatchlistToggle}
            disabled={watchlistLoading}
            className="w-full rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {isWatchlisted ? 'Unfollow market' : 'Follow market'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Source</h2>
          <p className="mt-3 text-slate-400">{market.sourceName}</p>
          <a href={market.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-blue-400 hover:text-blue-300">
            Open source link
          </a>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Resolution rules</h2>
          <p className="mt-3 text-slate-400">This market resolves based on the event described in the prompt by the close date below.</p>
          <div className="mt-4 text-sm text-slate-400">
            <div>Close date: <span className="font-semibold text-white">{closeDate}</span></div>
            <div>Resolve date: <span className="font-semibold text-white">{resolveDate}</span></div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Community signals</h2>
          <p className="mt-3 text-slate-400">{forecasts.length} forecasts have been submitted for this market.</p>
          <div className="mt-4 text-sm text-slate-400">{market.status === 'RESOLVED' ? `Resolved outcome: ${market.resolvedOutcome}` : 'Open to new forecasts until the close date.'}</div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-semibold text-white">Submit forecast</h2>
          <p className="mt-3 text-slate-400">Share probability, confidence, and your reasoning for this market.</p>

          {auth.user ? (
            <form onSubmit={handleSubmitForecast} className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-200">Position</label>
                <div className="mt-2 flex gap-3">
                  {(['YES', 'NO'] as const).map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setPosition(option)}
                      className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${position === option ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200">Probability (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={probability}
                  onChange={(event) => setProbability(Number(event.target.value))}
                  className="mt-3 w-full"
                />
                <div className="mt-2 text-sm text-slate-300">{probability}% likely</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200">Confidence (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={confidence}
                  onChange={(event) => setConfidence(Number(event.target.value))}
                  className="mt-3 w-full"
                />
                <div className="mt-2 text-sm text-slate-300">{confidence}% confidence in your estimate</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200">Reasoning</label>
                <textarea
                  value={reasoning}
                  onChange={(event) => setReasoning(event.target.value)}
                  rows={5}
                  className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  placeholder="Explain why this outcome is most likely."
                  required
                />
              </div>

              {formError ? <div className="rounded-3xl bg-red-900/20 border border-red-700 p-3 text-red-200">{formError}</div> : null}
              {formSuccess ? <div className="rounded-3xl bg-emerald-900/20 border border-emerald-700 p-3 text-emerald-200">{formSuccess}</div> : null}

              <button
                type="submit"
                disabled={submitting || market.status !== 'OPEN'}
                className="w-full rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? 'Saving forecast...' : market.status === 'OPEN' ? 'Submit forecast' : 'Market closed'}
              </button>
            </form>
          ) : (
            <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-slate-300">
              <p className="text-base font-semibold text-white">Sign in to submit a forecast.</p>
              <p className="mt-2 text-sm">Your probability, confidence, and reasoning will be saved to your profile.</p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="mt-4 rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Sign in
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold text-white">Market details</h2>
            <div className="mt-4 space-y-3 text-slate-300 text-sm">
              <div>
                <span className="font-semibold text-white">Question</span>
                <p className="mt-1">{market.title}</p>
              </div>
              <div>
                <span className="font-semibold text-white">Source</span>
                <p className="mt-1"><a href={market.sourceUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">{market.sourceName}</a></p>
              </div>
              <div>
                <span className="font-semibold text-white">Close date</span>
                <p className="mt-1">{closeDate}</p>
              </div>
              <div>
                <span className="font-semibold text-white">Resolution rules</span>
                <p className="mt-1">This market resolves to YES or NO based on the question above by the close date.</p>
              </div>
              <div>
                <span className="font-semibold text-white">Comments</span>
                <p className="mt-1">{forecasts.length} forecasts and community signals are active for this market.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold text-white">Recent forecasts</h2>
            {forecasts.length === 0 ? (
              <p className="mt-4 text-slate-400">No forecasts yet. Be the first to contribute.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {forecasts.slice(0, 5).map((forecast) => (
                  <div key={forecast._id} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm text-slate-400">{forecast.position}</span>
                      <span className="text-sm text-slate-300">{new Date(forecast.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="text-sm text-slate-300">Probability: <span className="font-semibold text-white">{forecast.probability}%</span></div>
                      <div className="text-sm text-slate-300">Confidence: <span className="font-semibold text-white">{forecast.confidence}%</span></div>
                    </div>
                    <p className="mt-3 text-slate-400 line-clamp-3">{forecast.reasoning}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
