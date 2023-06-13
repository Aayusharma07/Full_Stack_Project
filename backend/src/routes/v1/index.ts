import express, { Router } from 'express';
import authRoute from './auth.route';
import blogRoute from './blog.route';
import { authenticateMiddleware } from '../../services/congnito';
const router: Router = express.Router();

router.use('/blog',authenticateMiddleware, blogRoute);
router.use('/auth', authRoute);

export default router;
