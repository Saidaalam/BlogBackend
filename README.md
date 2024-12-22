Blog Backend 📝

A backend API for managing blogs, authors, and comments. This application allows you to create, read, update, and delete blogs while also providing functionalities for user authentication and comment management.

Features 🌟

Blog Management: Add, update, delete, and view blogs.
Author Management: Register, log in, and manage authors.
Comments: Add, delete, and view comments on blogs.
User Authentication: Secure APIs using JWT.
Error Handling: User-friendly error responses for all endpoints.

Technologies Used 🛠️

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Tokens

Language: TypeScript

API Endpoints 📋

Blogs

GET /api/blogs - Retrieve all blogs.

POST /api/blogs - Add a new blog.

PUT /api/blogs/:id - Update an existing blog.

DELETE /api/blogs/:id - Delete a blog.

Users

GET /api/users - Retrieve all users.

POST /api/auth/register - Register a new author.

POST /api/auth/login - Log in an author.

DELETE /api/admin/blogs/:id - Delete a specific blog.

PATCH /api/admin/users/:userId/block - Block an user.

Clone the Repository:

git clone https://github.com/Saidaalam/BlogBackend.git  
cd blog-backend 

Set Up Environment Variables:

PORT=8000

MONGODB_URI=mongodb+srv://alamsaida18:xSuNJUbPq7Htormr@cluster0.xreal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=b69019b4792ae183c1e4acb85bbd706c1842d0f011d2f32052f4183e1a2ec319

Install Dependencies:

npm install  

Run the Application Locally: npm run dev 

Access the Application: Use a tool like Postman or Thunder Client to test the API endpoints.
