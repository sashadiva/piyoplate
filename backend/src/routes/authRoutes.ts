import { Router } from 'express';
import { login, register } from '../controllers/authControllers';
import { validatePassword } from '../middlewares/registerValidation';

const router = Router();

router.post('/register', validatePassword, register); 
router.post('/login', login);

export default router;