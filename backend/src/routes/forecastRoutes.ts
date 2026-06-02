import { Router } from 'express';
import { submitForecast, listForecasts } from '../controllers/forecastController';
import { requireAuth } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { forecastSchema } from '../validators/forecastValidators';

const router = Router();
router.post('/', requireAuth, validate(forecastSchema), submitForecast);
router.get('/:marketId', listForecasts);

export default router;
