import { Router } from 'express';
import { authenticateAdmin } from '../middlewares/adminMiddleware'; 
import { blockUser, deleteBlog } from '../controllers/adminController';

const router = Router();

// Block user route (admin only)
router.patch('/users/:userId/block', blockUser); 

// Admin can delete any blog
router.delete('/blogs/:id', deleteBlog);

export default router;
