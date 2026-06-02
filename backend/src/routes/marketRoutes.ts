import { Router } from 'express';
import { createMarket, listMarkets, getMarket, resolveMarket } from '../controllers/marketController';
import { requireAuth, requireRole } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { marketSchema } from '../validators/marketValidators';
import { marketResolutionSchema } from '../validators/marketResolutionValidators';

const router = Router();
router.get('/', listMarkets);
router.get('/:id', getMarket);
router.post('/', requireAuth, requireRole('MODERATOR'), validate(marketSchema), createMarket);
router.post('/:id/resolve', requireAuth, requireRole('ADMIN'), validate(marketResolutionSchema), resolveMarket);

export default router;
