import { Router } from 'express';
import { addDailyLog, getCalorieSummary } from '../controllers/nutrisionsControllers';

const router = Router();

router.post('/log', addDailyLog);
router.get('/summary/:userId', getCalorieSummary);

export default router;