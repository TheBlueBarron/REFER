# Referral App

This repository contains a simple referral tracking application with a React frontend and an Express/PostgreSQL backend.

## Features

- User registration and login using JSON Web Tokens
- Create services with a reward amount
- Add friends by email and view their services
- Send referral leads for a friend's service with an optional note
- View leads you have submitted
- View incoming leads for your services and update their status

## Prerequisites

- **Node.js** (tested with Node 18 or later)
- **npm** package manager
- **PostgreSQL** database accessible via a connection string

## Backend Setup

1. Navigate to the backend directory and install dependencies:
   ```bash
   cd refer-backend
   npm install
   ```
2. Create a `.env` file in `refer-backend` with the following variables:
   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=postgres://user:pass@host:port/dbname
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```
3. Start the server in development mode:
   ```bash
   npm run dev
   ```
   The API will be available on `http://localhost:3000`.

## Frontend Setup

1. Navigate to the React app directory and install dependencies:
   ```bash
   cd refer-app
   npm install
   ```
2. The frontend uses `src/api/axiosClient.js` to contact the backend. Update the `baseURL` there if your backend runs on a different host or port.
3. Run the development server:
   ```bash
   npm run dev
   ```
   This starts Vite on `http://localhost:5173`.

Both servers must be running for the application to work. You can then open the frontend URL in your browser and sign up or log in.
