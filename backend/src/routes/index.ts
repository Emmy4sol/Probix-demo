import { Router } from 'express';
import authRoutes from './authRoutes';
import marketRoutes from './marketRoutes';
import forecastRoutes from './forecastRoutes';
import sourceRoutes from './sourceRoutes';
import watchlistRoutes from './watchlistRoutes';
import voteRoutes from './voteRoutes';
import insightRoutes from './insightRoutes';
import leaderboardRoutes from './leaderboardRoutes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/markets', marketRoutes);
router.use('/forecasts', forecastRoutes);
router.use('/sources', sourceRoutes);
router.use('/watchlist', watchlistRoutes);
router.use('/votes', voteRoutes);
router.use('/insights', insightRoutes);
router.use('/leaderboards', leaderboardRoutes);

export default router;
