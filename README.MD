# FindRoommies API 🚀

Backend API for **FindRoommies** project, built with **Express.js** and **MongoDB**.  

⚠️ **Note:** This API is still not secure (authentication & authorization not implemented yet).  

## Features
- User management (CRUD)
- Post management (CRUD)
- Public & Private posts
- MongoDB Atlas connection

## Endpoints

### Root
- `GET /` → Test server status

### Users
- `GET /users` → Get all users  
- `GET /users/:id` → Get single user  
- `POST /users` → Create new user  
- `PUT /users/:id` → Update user  

### Posts
- `GET /posts` → Get all active posts  
- `GET /posts-limit/:limit` → Get limited active posts  
- `GET /my-posts/:uid` → Get posts created by a user  
- `POST /posts` → Create new post  
- `PUT /posts/:id` → Update post  
- `DELETE /posts/:id` → Delete post  

## Tech Stack
- Node.js  
- Express.js  
- MongoDB Atlas  
- dotenv, cors
