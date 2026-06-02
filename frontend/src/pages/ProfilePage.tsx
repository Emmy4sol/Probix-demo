import { useAppSelector } from '../app/hooks';

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="p-8 text-white">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-10 text-center">
          <p className="text-lg font-semibold">Loading profile…</p>
        </div>
      </div>
    );
  }

  const successRate = user.forecastsCount > 0 ? Math.round((user.correctForecasts / user.forecastsCount) * 100) : 0;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">👤 Profile</h1>

      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl p-8 mb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-bold text-black bg-gradient-to-br from-amber-400 to-orange-500">
              {user.avatar ? <img src={user.avatar} alt={user.username} className="w-full h-full rounded-3xl object-cover" /> : user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{user.username}</h2>
              <p className="text-slate-400 mb-4">{user.bio || 'Insight-driven forecaster building probability edge.'}</p>
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-slate-500 text-sm">Reputation</p>
                  <p className="text-2xl font-bold text-amber-400">{user.reputation}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Accuracy</p>
                  <p className="text-2xl font-bold text-emerald-400">{user.accuracyScore}%</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Rank</p>
                  <p className="text-2xl font-bold text-blue-400">#{user.rank ?? '-'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <p className="text-slate-400 text-sm mb-2">Total Forecasts</p>
          <div className="text-4xl font-bold text-blue-400">{user.forecastsCount}</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <p className="text-slate-400 text-sm mb-2">Correct Forecasts</p>
          <div className="text-4xl font-bold text-emerald-400">{user.correctForecasts}</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
          <p className="text-slate-400 text-sm mb-2">Success Rate</p>
          <div className="text-4xl font-bold text-purple-400">{successRate}%</div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">Forecasted: Naira below ₦2,000/$</p>
                <p className="text-sm text-slate-400">Economy • 2 days ago</p>
              </div>
              <span className="text-green-400 font-semibold">✓ Correct</span>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">Forecasted: Egg crate below ₦4,500</p>
                <p className="text-sm text-slate-400">Economy • 5 days ago</p>
              </div>
              <span className="text-yellow-400 font-semibold">⏳ Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
