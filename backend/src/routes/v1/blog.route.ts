import express, { Router } from 'express';
import { blogController } from '../../controllers';
const router: Router = express.Router();

router.post('/create', blogController.createBlog);
router.get('/alldata', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);
router.delete('/:id', blogController.deleteBlog);

export default router;
