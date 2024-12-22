import express from 'express';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes';

dotenv.config();  

const app = express();
app.use(express.json());

app.use('/api/blogs', blogRoutes);  

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
