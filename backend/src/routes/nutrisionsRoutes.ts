import { Router } from 'express';
import { addDailyLog, getCalorieSummary } from '../controllers/nutrisionsControllers';

const router = Router();

router.post('/log', addDailyLog);           // UC-08[cite: 1]
router.get('/summary/:userId', getCalorieSummary); // UC-08[cite: 1]

export default router;