import { Router } from 'express';
import { checkEligibility } from '../controllers/client-controller';
import { validateInput } from '../middlewares/validator';

const router = Router();

router.post('/verificar-elegibilidade/', validateInput, checkEligibility);

export default router;
