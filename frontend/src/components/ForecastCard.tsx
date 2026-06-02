interface ForecastCardProps {
  title: string;
  category: string;
  percent: string;
  detail: string;
  secondary?: string;
  color?: string;
  onClick?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
}

const COLOR_MAP: Record<string, string> = {
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  emerald: 'text-emerald-400',
  blue: 'text-blue-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
  sky: 'text-sky-400',
  yellow: 'text-yellow-400',
};

export default function ForecastCard({
  title,
  category,
  percent,
  detail,
  secondary,
  color = 'blue',
  onClick,
  actionLabel,
  onAction,
  actionDisabled,
}: ForecastCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-blue-600">
      <div
        role={onClick ? 'button' : undefined}
        onClick={onClick}
        className={`${onClick ? 'cursor-pointer' : ''} flex-1 text-left`}
      >
        <div className="flex justify-between mb-4">
          <span className="px-4 py-1 bg-zinc-800 text-xs rounded-full">{category}</span>
          <span className="text-zinc-400 text-xs">{secondary}</span>
        </div>
        <p className="font-semibold text-lg leading-tight mb-8">{title}</p>
        <div className="flex items-end justify-between gap-4">
          <span className={`text-6xl font-bold ${COLOR_MAP[color ?? 'blue']}`}>{percent}</span>
          <span className="text-sm text-slate-400">{detail}</span>
        </div>
      </div>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onAction();
          }}
          disabled={actionDisabled}
          className="mt-6 w-full rounded-2xl border border-zinc-800 bg-zinc-950 py-3 text-sm font-semibold text-white transition hover:border-blue-500 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {actionLabel}
        </button>
      ) : null}
    </article>
  );
}
