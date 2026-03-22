# Water Intake Tracker

A full-stack app to track daily water intake with blogs, analytics, products, videos, and a mock AI chatbot.

## Folder Structure
- `Watertracker/backend` — Node.js + Express + MongoDB API
- `Watertracker/frontend` — React + Vite + Tailwind UI
- `Watertracker/sample_data` — Example JSON datasets

## Environment Variables
- Backend (`backend/.env`):
  - `PORT=5000`
  - `MONGODB_URI=mongodb://localhost:27017/watertracker`
  - `JWT_SECRET=<secure_random>`
  - `CLIENT_URL=http://localhost:5173`
- Frontend (`frontend/.env`):
  - `VITE_API_URL=http://localhost:5000`

## API Documentation
- Auth
  - `POST /auth/register` — body `{ name,email,password,dailyGoal?,weight? }`
  - `POST /auth/login` — body `{ email,password }` → returns `{ token,user }`
- User
  - `GET /user/profile` — Bearer token
  - `PUT /user/profile` — Bearer token, body `{ name?, dailyGoal?, weight? }`
- Water
  - `POST /water/add` — Bearer token, body `{ amount }`
  - `GET /water/today` — Bearer token
  - `GET /water/history` — Bearer token → `{ daily: [{ date,total,entries[] }] }`
  - `GET /water/stats` — Bearer token → `{ bestDay,worstDay,last30[],weeklyAvg[],achievements[],streak }`
- Blog
  - `POST /blog` — body `{ title,content,author? }`
  - `GET /blogs` — list
  - `GET /blog/:id` — single + comments
  - `POST /blog/:id/comments` — body `{ author?,content }`
- Contact
  - `POST /contact` — body `{ name,email,message }` → stores + auto-reply
- Chatbot (mock)
  - `POST /chatbot/ask` — body `{ prompt,weight? }` → `{ answer }`
  - `GET /chatbot/sample` — preloaded Q&A

## Run Locally (Root)
From the project root directory (`/Users/sapnarai/Documents/trae_projects/WaterIntake`), you can run:
- `npm run install:all` — to install both backend and frontend dependencies
- `npm run dev` — to start both backend and frontend concurrently

## Run Individually
- Backend
  - `cd Watertracker/backend`
  - `cp .env.example .env` and edit values
  - `npm install`
  - `npm run dev`
- Frontend
  - `cd Watertracker/frontend`
  - `cp .env.example .env`
  - `npm install`
  - `npm run dev` (opens `http://localhost:5173`)

## Docker (optional)
- Backend
  - `docker build -t watertracker-backend ./Watertracker/backend`
  - `docker run -p 5000:5000 --env-file Watertracker/backend/.env watertracker-backend`
- Frontend
  - `docker build -t watertracker-frontend ./Watertracker/frontend`
  - `docker run -p 5173:5173 watertracker-frontend`

## Deployment Guide
- Render (Backend)
  - Create new Web Service → Node, set `Start Command: node src/server.js`
  - Add env: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`
- Railway (Backend)
  - Deploy from repo, install, set variables, `npm start`
- Vercel (Frontend)
  - Import project, set `VITE_API_URL` to hosted backend URL, build with Vite default.

## Features
- Responsive UI with Tailwind
- Dark mode toggle, daily reminder popup
- Intake logging, timeline, progress bar
- Analytics with Recharts (line + bar)
- Blogs with comments
- Products grid with affiliate links
- Videos page embeds
- Mock AI chatbot
- Achievements badges and streaks
