import { useEffect, useState } from 'react';
import MarketTabs from '../components/MarketTabs';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';

const leaderboardTabs = [
  { id: 'all', label: 'All' },
  { id: 'politics', label: 'Politics' },
  { id: 'sports', label: 'Sports' },
  { id: 'economy', label: 'Economy' },
  { id: 'technology', label: 'Technology' },
];

const mockLeaderboard = [
  { rank: 1, username: 'OkonkwoAI', category: 'all', accuracy: 82, xp: '4.3k', reputation: 850 },
  { rank: 2, username: 'ForecastKing', category: 'politics', accuracy: 79, xp: '3.8k', reputation: 780 },
  { rank: 3, username: 'PriceWizard', category: 'economy', accuracy: 76, xp: '3.2k', reputation: 720 },
  { rank: 4, username: 'MarketGuru', category: 'technology', accuracy: 73, xp: '2.9k', reputation: 680 },
  { rank: 5, username: 'ChartMaster', category: 'sports', accuracy: 71, xp: '2.5k', reputation: 640 },
  { rank: 6, username: 'SignalSage', category: 'all', accuracy: 69, xp: '2.2k', reputation: 610 },
  { rank: 7, username: 'PulsePilot', category: 'economy', accuracy: 67, xp: '2.0k', reputation: 590 },
  { rank: 8, username: 'TrendTorch', category: 'technology', accuracy: 65, xp: '1.8k', reputation: 560 },
  { rank: 9, username: 'VisionaryV', category: 'politics', accuracy: 64, xp: '1.6k', reputation: 540 },
  { rank: 10, username: 'ForecastFury', category: 'sports', accuracy: 63, xp: '1.4k', reputation: 520 },
];

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setTimeout(() => setLoading(false), 900);
  }, []);

  const filteredLeaderboard = mockLeaderboard.filter((entry) => activeTab === 'all' || entry.category === activeTab);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">🏆 Leaderboard</h1>
        <p className="text-slate-400">Top forecasters across all categories.</p>
      </div>

      <MarketTabs tabs={leaderboardTabs.map((tab) => ({ ...tab, onClick: () => setActiveTab(tab.id) }))} activeTab={activeTab} />

      {loading ? (
        <LoadingState />
      ) : filteredLeaderboard.length === 0 ? (
        <EmptyState
          icon="🏅"
          title="No leaderboard entries yet"
          description="Top forecasters will appear here once markets start generating results."
          actionLabel="Explore markets"
          actionPath="/markets"
        />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-xl shadow-slate-950/20">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-slate-300">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Rank</th>
                <th className="px-6 py-4 text-sm font-semibold">User</th>
                <th className="px-6 py-4 text-sm font-semibold">Accuracy</th>
                <th className="px-6 py-4 text-sm font-semibold">Reputation</th>
                <th className="px-6 py-4 text-sm font-semibold">XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLeaderboard.map((entry) => (
                <tr key={entry.rank} className="hover:bg-slate-900/80 transition">
                  <td className="px-6 py-4 align-top">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
                      <span className="text-amber-400">#{entry.rank}</span>
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : null}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">{entry.username}</td>
                  <td className="px-6 py-4 text-emerald-400">{entry.accuracy}%</td>
                  <td className="px-6 py-4 text-slate-400">{entry.reputation}</td>
                  <td className="px-6 py-4 text-slate-400">{entry.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
