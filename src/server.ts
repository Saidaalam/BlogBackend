import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errorHandler } from './utils.ts/errorHandler';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import notFound from './middlewares/notFound';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route handler (GET /)
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the server!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// 404 Middleware (after all routes)
app.use(notFound);

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:8000/BlogBackend')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
