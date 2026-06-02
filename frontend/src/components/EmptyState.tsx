import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionPath?: string;
}

export default function EmptyState({ icon, title, description, actionLabel, actionPath }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-10 text-center text-slate-300">
      {icon ? <div className="mx-auto mb-5 text-5xl">{icon}</div> : null}
      <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>
      <p className="max-w-xl mx-auto text-slate-400 mb-6">{description}</p>
      {actionLabel && actionPath ? (
        <Link to={actionPath} className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
