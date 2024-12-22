import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import Blog from '../models/blogModel';

// Block User (admin only)
export const blockUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    user.isBlocked = true;
    await user.save();
    res.status(200).json({ success: true, message: 'User blocked successfully', statusCode: 200, });
  } catch (err) {
    next(err); 
  }
};

// Delete a blog (admin only)
export const deleteBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Blog deleted successfully', statusCode: 200 });
  } catch (error) {
    next(error); 
  }
};
