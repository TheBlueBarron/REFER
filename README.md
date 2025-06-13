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
2. The frontend uses `src/api/axiosClient.js` to contact the backend. The base URL is controlled by the `VITE_API_BASE` environment variable. Create a `.env` file (or edit `.env.example`) if your backend runs on a different host or port.
3. Run the development server:
   ```bash
   npm run dev
   ```
   This starts Vite on `http://localhost:5173`.

Both servers must be running for the application to work. You can then open the frontend URL in your browser and sign up or log in.

## Production Deployment Example (lowleads.com)

Follow these additional steps when deploying the project to a real domain such as `https://lowleads.com`.

1. **Configure the backend environment**
   Create `refer-backend/.env` with production values:
   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=postgres://user:pass@host:port/dbname
   NODE_ENV=production
   FRONTEND_URL=https://lowleads.com
   ```
   Start the backend server with your preferred process manager (`pm2`, `systemd`, etc.).

2. **Build the frontend**
   In `refer-app`, create an `.env` file based on `.env.example`:
   ```env
   VITE_API_BASE=https://lowleads.com/api
   ```
   Then build the static files:
   ```bash
   cd refer-app
   npm install
   npm run build
   ```
   The compiled site will be available under `refer-app/dist`.

3. **Serve the site**
   Serve the contents of `refer-app/dist` via your web server and proxy `/api` requests to the Node backend.
   Below is a simplified Nginx snippet:
   ```nginx
   server {
     server_name lowleads.com;
     root /path/to/refer-app/dist;

     location /api/ {
       proxy_pass http://localhost:3000/api/;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }

     location / {
       try_files $uri /index.html;
     }
   }
   ```
   Adjust paths and proxy settings as needed for your environment.
