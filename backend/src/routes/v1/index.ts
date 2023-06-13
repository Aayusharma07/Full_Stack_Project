import express, { Router } from 'express';
import authRoute from './auth.route';
import blogRoute from './blog.route';
const router: Router = express.Router();

router.use('/blog', blogRoute);
router.use('/auth', authRoute);

export default router;
