import { Router } from 'express';
import { voteForecast, getForecastVotes } from '../controllers/voteController';
import { requireAuth } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { voteSchema } from '../validators/voteValidators';

const router = Router();
router.post('/', requireAuth, validate(voteSchema), voteForecast);
router.get('/:forecastId', getForecastVotes);

export default router;
