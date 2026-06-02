import { Router } from 'express';
import { createSource, listSources } from '../controllers/sourceController';
import { requireAuth, requireRole } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { sourceSchema } from '../validators/sourceValidators';

const router = Router();
router.get('/', listSources);
router.post('/', requireAuth, requireRole('MODERATOR'), validate(sourceSchema), createSource);

export default router;
