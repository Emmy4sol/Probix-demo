import { Router } from 'express';
import { addWatchlist, removeWatchlist, getWatchlist } from '../controllers/watchlistController';
import { requireAuth } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { watchlistSchema } from '../validators/watchlistValidators';

const router = Router();
router.use(requireAuth);
router.get('/', getWatchlist);
router.post('/', validate(watchlistSchema), addWatchlist);
router.delete('/:marketId', removeWatchlist);

export default router;
