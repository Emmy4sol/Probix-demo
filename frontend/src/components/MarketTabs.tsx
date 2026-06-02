import { useLocation, Link } from 'react-router-dom';

interface TabItem {
  id: string;
  label: string;
  path?: string;
  onClick?: () => void;
}

interface MarketTabsProps {
  tabs: TabItem[];
  activeTab?: string;
}

export default function MarketTabs({ tabs, activeTab }: MarketTabsProps) {
  const location = useLocation();

  return (
    <div className="flex flex-wrap gap-3 rounded-3xl border border-slate-800 bg-slate-950/80 p-3">
      {tabs.map((tab) => {
        const isActive = tab.path
          ? location.pathname === tab.path || location.pathname.startsWith(tab.path)
          : activeTab === tab.id;

        const className = `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
          isActive ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-900/80'
        }`;

        if (tab.path) {
          return (
            <Link key={tab.id} to={tab.path} className={className}>
              {tab.label}
            </Link>
          );
        }

        return (
          <button key={tab.id} type="button" onClick={tab.onClick} className={className}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
