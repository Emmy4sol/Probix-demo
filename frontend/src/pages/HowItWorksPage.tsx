export default function HowItWorksPage() {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
      <h1 className="text-3xl font-semibold text-white">How Probix Works</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Forecast</h2>
          <p className="mt-2 text-slate-400">Submit predictions for major events with probability and reasoning.</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Track</h2>
          <p className="mt-2 text-slate-400">Follow markets, build watchlists and see community insights.</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Rank</h2>
          <p className="mt-2 text-slate-400">Earn reputation and leaderboard placement through consistent accuracy.</p>
        </div>
      </div>
    </section>
  );
}
