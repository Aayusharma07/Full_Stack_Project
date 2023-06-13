import express, { Router } from 'express';
import { createBlog } from '../../controllers/blog.controller';
const router: Router = express.Router();

router.post('/create', createBlog)

export default router;