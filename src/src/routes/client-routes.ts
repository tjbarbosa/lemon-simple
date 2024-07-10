import { Router } from 'express';
import { validateClient } from '../../middlewares/validator';
import { checkEligibilityClient } from '../../controllers/client-controller';

const router = Router();

router.post('/validaCliente/', validateClient, checkEligibilityClient);

export default router;
