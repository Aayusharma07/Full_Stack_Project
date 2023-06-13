import express, { Router } from 'express';
import { createBlog, getAllBlogs } from '../../controllers/blog.controller';
const router: Router = express.Router();

router.post('/create', createBlog);
router.get('/alldata', getAllBlogs);

export default router;
