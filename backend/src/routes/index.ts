import express, { Router } from 'express';
import indexRoute from './v1/index';
const router: Router = express.Router();

router.use('/v1', indexRoute);

export default router;
