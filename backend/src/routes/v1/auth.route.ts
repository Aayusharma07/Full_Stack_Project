// import express from 'express';
// import { user } from '../../controllers';
// const router: express.Router = express.Router();

import express, { Router } from "express";
import { authController } from "../../controllers";
const router: Router = express.Router();

router.get('/hello', authController.user)

export default router;