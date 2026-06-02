import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logoutUser } from '../features/auth/authSlice';

const NAV_LINKS = [
  { id: 'home', label: 'Home', path: '/', icon: 'fa-solid fa-house' },
  { id: 'trending', label: 'Trending', path: '/trending', icon: 'fa-solid fa-fire' },
  { id: 'markets', label: 'Markets', path: '/markets', icon: 'fa-solid fa-chart-line' },
  { id: 'howitworks', label: 'How It Works', path: '/how-it-works', icon: 'fa-solid fa-lightbulb' },
  { id: 'insights', label: 'Insights', path: '/insights', icon: 'fa-solid fa-globe' },
  { id: 'leaderboard', label: 'Leaderboard', path: '/leaderboard', icon: 'fa-solid fa-trophy' },
  { id: 'watchlist', label: 'Watchlist', path: '/watchlist', icon: 'fa-solid fa-star' },
  { id: 'profile', label: 'Profile', path: '/profile', icon: 'fa-solid fa-user' },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row overflow-hidden bg-zinc-950 text-white">
      {/* SIDEBAR */}
      <div className="w-full md:w-72 bg-black border-b border-zinc-800 md:border-b-0 md:border-r flex flex-col overflow-y-auto">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
          <div className="w-14 h-14 rounded-3xl overflow-hidden bg-zinc-900 flex items-center justify-center">
            <img src="/IMG/probixlogo.png" alt="Probix logo" className="w-full h-full object-cover" />
          </div>
          <div className="text-4xl font-bold tracking-tighter">Probix</div>
        </div>

        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl py-3 px-5 text-sm focus:border-blue-500 outline-none"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.id}
                to={link.path}
                className={`w-full flex items-center gap-3 px-5 py-3 rounded-2xl transition inline-flex ${
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-zinc-900 text-slate-300'
                }`}
              >
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Card */}
        <div className="p-4 border-t border-zinc-800">
          <div className="bg-zinc-900 rounded-3xl p-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg font-semibold text-black bg-gradient-to-br from-amber-400 to-orange-500">
                {auth.user ? auth.user.username.charAt(0).toUpperCase() : 'G'}
              </div>
              <div>
                <div className="font-semibold">{auth.user?.username ?? 'Guest'}</div>
                <div className="text-emerald-400 text-xs">
                  {auth.user ? `${Math.round(auth.user.accuracyScore)}% Accuracy • ${auth.user.reputation} XP` : 'Sign in to unlock forecasts'}
                </div>
              </div>
            </div>
          </div>
          {auth.user ? (
            <button
              onClick={handleLogout}
              className="w-full mt-4 bg-red-900/20 hover:bg-red-900/40 border border-red-700 text-red-400 py-2 rounded-xl text-sm transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="w-full mt-4 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto bg-zinc-950">
        <Outlet />
      </div>
    </div>
  );
}
