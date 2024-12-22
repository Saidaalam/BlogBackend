import express from 'express';
import { createBlog, updateBlog, deleteBlog, getBlogs } from '../controllers/blogController';

const router = express.Router();

router.post('/', createBlog);      
router.patch('/:id', updateBlog);  
router.delete('/:id', deleteBlog); 
router.get('/', getBlogs);       

export default router;
