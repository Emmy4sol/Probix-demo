import { Router } from 'express';
import { globalLeaderboard, categoryLeaderboard, userLeaderboard } from '../controllers/leaderboardController';

const router = Router();
router.get('/global', globalLeaderboard);
router.get('/category/:slug', categoryLeaderboard);
router.get('/user/:id', userLeaderboard);

export default router;
