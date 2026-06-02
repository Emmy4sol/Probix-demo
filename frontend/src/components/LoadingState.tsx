export default function LoadingState() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
      <div className="mx-auto mb-6 h-1.5 w-40 animate-pulse rounded-full bg-slate-700" />
      <p className="text-lg font-semibold text-white mb-2">Fetching forecast signals…</p>
      <p className="text-sm text-slate-500">This can take a moment for live market updates.</p>
    </div>
  );
}
