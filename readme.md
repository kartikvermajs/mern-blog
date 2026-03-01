🚀 MERN Blog Platform

This project is reuploaded due to some depricated dependencies , this project was made my me to learn the workin of role based system and ther things

📌 Overview

A full-stack blog platform built using the MERN stack (MongoDB, Express, React, Node.js) with a strong focus on:

🔐 Role-Based Access Control (RBAC)

🧠 Authentication & Authorization

📝 Content creation and management

💬 User engagement through comments

☁️ Cloud-based image handling

This project simulates a real-world blogging system where admins create content and users interact with it.

🧩 Features
👨‍💻 Admin

Create, update, and delete posts

Upload images (Cloudinary)

Manage content categories (React, Next.js, JavaScript)

👤 Users

Sign up / Sign in (Firebase + Backend JWT)

View posts

Comment on posts

🌐 General

Responsive UI

Protected routes

Secure cookie-based authentication

Serverless backend deployment (Vercel)

🏗️ Tech Stack
Frontend

React (Vite)

Redux Toolkit

Tailwind CSS + Flowbite UI

Backend

Node.js + Express

MongoDB Atlas (Mongoose)

JWT Authentication

Services

Cloudinary (Image Uploads)

Firebase (OAuth Authentication)

📁 Project Structure
mern-blog/
│
├── api/ # Backend (Express + MongoDB)
├── client/ # Frontend (React + Vite)
└── README.md
⚙️ Environment Variables
Backend (api/.env)
MONGO=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=production
Frontend (client/.env)
VITE_BACKEND_URL=https://your-backend-url.vercel.app
VITE_FIREBASE_API_KEY=your_firebase_key
🚀 Installation & Setup

1. Clone the repository
   git clone https://github.com/your-username/mern-blog.git
   cd mern-blog
2. Install dependencies
   npm install
   npm install --prefix api
   npm install --prefix client
3. Run locally
   Backend
   cd api
   npm start
   Frontend
   cd client
   npm run dev
   🌱 Seeding Database

To populate demo data:

cd api
node src/seed.js

This will:

Create admins & users

Generate posts

Add comments

Upload images to Cloudinary

🔐 Authentication Flow

Firebase handles OAuth (Google Sign-In)

Backend issues JWT cookies

Protected routes validate user roles

Admin-only routes enforce strict access

🌍 Deployment

Frontend: Vercel

Backend: Vercel (Serverless Functions)

Database: MongoDB Atlas

⚠️ Known Learnings

Handling cross-origin cookies (sameSite, secure)

Managing serverless DB connections

Syncing frontend and backend authentication

Avoiding state mismatch between JWT and DB

📈 Future Improvements

Like system for posts/comments

Rich text enhancements

Notifications system

Better search and filtering

Image optimization

🤝 Contributing

This is a personal learning project, but suggestions and improvements are welcome.

📄 License

MIT License

🧠 Final Note

This project was built to deeply understand how modern full-stack systems work—especially around authentication, authorization, and real-world data flow.
