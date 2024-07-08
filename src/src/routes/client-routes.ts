import { Router } from 'express';
import { validateClient } from '../../middlewares/validator';
import { checkEligibilityClient } from '../../controllers/client-controller';


const router = Router();

// router.post('/', validateClient, validateClient);
router.post('/validaCliente/', validateClient, checkEligibilityClient);
// router.post('/cliente', validateClient, validateClient);

export default router;
