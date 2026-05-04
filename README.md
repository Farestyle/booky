# MERN Bookstore

This repository contains a complete MERN bookstore application with a frontend and backend split for production-ready development.

## Directory Structure

- `frontend/` — React + Vite application styled with Tailwind CSS.
- `backend/` — Express API with MongoDB, Mongoose, JWT authentication, and secure route protection.

## Setup Instructions

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment template and update values:
   ```bash
   cp .env.example .env
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend runs on `http://localhost:5000` by default.

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend runs on `http://localhost:5173` by default.

## Features

- User registration and login with secure JWT authentication.
- HTTP-only cookies for token handling and protected API routes.
- Book CRUD operations with backend route protection.
- Search, category filtering, and pagination for the book catalog.
- Responsive homepage with hero, shop, info, favorites, and premium footer sections.
- Secure admin route at `/admin/add-book` for adding new books.
- Shopping cart and checkout simulation with order creation.
- Responsive Tailwind UI with a modern high-contrast layout.

## Notes

- The frontend uses Axios with `withCredentials: true` to send cookies to the backend.
- The backend uses CORS configured for `CLIENT_URL` in `.env`.
- For production deployments, use HTTPS and set `NODE_ENV=production`.
