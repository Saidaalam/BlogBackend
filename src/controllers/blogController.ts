import { Request, Response } from 'express';
import Blog from '../models/blogModel';

// Create a blog post
export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.create({
      title,
      content,
      author: "6767d5d29252dbc4da45a576",
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      statusCode: 201,
      data: blog,
    });
  } catch (error) {
    console.error("Error creating blog:", error); 
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the blog",
      statusCode: 500,
    });
  }
};

// Update an existing blog
export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const blog = await Blog.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error("Error updating blog:", error); 
    res.status(500).json({ success: false, message: 'Error updating blog' });
  }
};

// Delete a blog post
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error("Error deleting blog:", error); 
    res.status(500).json({ success: false, message: 'Error deleting blog' });
  }
};

// Get all blogs
export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, sortBy = 'createdAt', sortOrder = 'desc', author } = req.query;

    // Build the query object
    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } } 
      ];
    }
    if (author) {
      query.author = author;
    }

    // Build the sorting object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    // Fetch blogs with query, sort, and populate author details
    const blogs = await Blog.find(query).sort(sort).populate('author', 'name email'); // Assuming author has name and email fields

    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      statusCode: 200,
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error); 
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      statusCode: 500
    });
  }
};
