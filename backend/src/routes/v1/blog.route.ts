import express, { Router } from 'express';
import { blogController } from '../../controllers';
const router: Router = express.Router();

router.post('/create', blogController.createBlog);
router.get('/alldata', blogController.getAllBlogs);

export default router;
