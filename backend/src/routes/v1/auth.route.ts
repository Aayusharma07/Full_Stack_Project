import express, { Router } from 'express';
import { authController } from '../../controllers';
const router: Router = express.Router();

router.post('/register', authController.signUp);
router.post('/confirmuser', authController.confirmSignUp);
router.post('/signin', authController.signIn);

export default router;
