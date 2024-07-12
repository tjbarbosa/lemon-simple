import { Router } from 'express';
import { validateInput } from '../../middlewares/validator';
import { checkEligibility } from '../../controllers/client-controller';

const router = Router();

router.post('/verificar-elegibilidade/', validateInput, checkEligibility);

export default router;
