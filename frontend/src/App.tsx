import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TrendingPage from './pages/TrendingPage';
import MarketsPage from './pages/MarketsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import InsightsPage from './pages/InsightsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import WatchlistPage from './pages/WatchlistPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import PoliticsPage from './pages/PoliticsPage';
import SportsPage from './pages/SportsPage';
import EntertainmentPage from './pages/EntertainmentPage';
import EconomyPage from './pages/EconomyPage';
import WeatherPage from './pages/WeatherPage';
import NigeriaPage from './pages/NigeriaPage';
import AfricaPage from './pages/AfricaPage';
import TechnologyPage from './pages/TechnologyPage';
import StartupsPage from './pages/StartupsPage';
import GlobalPage from './pages/GlobalPage';
import MarketPage from './pages/MarketPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/markets/:slug" element={<MarketPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <WatchlistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/politics" element={<PoliticsPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
        <Route path="/economy" element={<EconomyPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/markets/nigeria" element={<NigeriaPage />} />
        <Route path="/markets/africa" element={<AfricaPage />} />
        <Route path="/markets/technology" element={<TechnologyPage />} />
        <Route path="/markets/startups" element={<StartupsPage />} />
        <Route path="/markets/global" element={<GlobalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
}

export default App;
