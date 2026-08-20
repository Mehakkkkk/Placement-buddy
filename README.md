# 🎯 Placement Preparation Tracker

A full-stack web application to help students manage their complete placement preparation journey — track job applications, interview rounds, DSA practice, and view progress on a live dashboard.

**Live Demo:** [Add your deployed link here once deployment is complete]

## 📋 Features

- **Secure Authentication** — JWT-based auth with bcrypt password hashing and protected routes
- **Company Application Tracker** — Add, edit, delete, and filter job applications by status (Applied, OA, Interview, Selected, Rejected)
- **Interview & OA Tracker** — Log interview rounds per company, including questions asked and personal notes
- **DSA Preparation Tracker** — Track practice questions by topic, difficulty, and solve status, with filtering
- **Live Dashboard** — Real-time stats: total applications, stage-wise breakdown, DSA solve progress

## 🛠️ Tech Stack

**Frontend:** React.js, React Router, Axios, Vite
**Backend:** Node.js, Express.js
**Database:** MySQL
**Authentication:** JWT, bcrypt

## 🏗️ Architecture
React (Frontend) → REST API (Express/Node.js) → MySQL Database

The frontend and backend are fully decoupled, communicating exclusively over HTTP via a RESTful API. Authentication uses JWT tokens verified by custom Express middleware, ensuring all data access is scoped to the logged-in user.

## 🗄️ Database Schema

- **users** — stores account credentials (hashed passwords)
- **companies** — job applications, linked to `users` via `user_id`
- **interview_rounds** — OA/interview details, linked to `companies` via `company_id`
- **dsa_questions** — practice questions, linked to `users` via `user_id`

All relationships enforce referential integrity via foreign keys with `ON DELETE CASCADE`.

## 🔐 Security Highlights

- Passwords hashed with bcrypt (never stored in plain text)
- JWT-based authentication with protected routes
- Parameterized SQL queries throughout (prevents SQL injection)
- User-scoped data access — users can only access their own data, enforced at the database query level
- Environment variables for all secrets (never hardcoded)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL (v8+)

### Backend Setup
```bash
cd Backend
npm install
# Create a .env file with DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET, PORT
npm run dev
```

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

## 📁 Project Structure

placement-tracker/
├── Backend/
│ ├── config/ # Database connection
│ ├── controllers/ # Business logic
│ ├── middleware/ # JWT auth middleware
│ ├── routes/ # API route definitions
│ └── server.js
└── Frontend/
└── src/
├── api/ # Axios config
├── components/ # Reusable UI components
├── hooks/ # Custom React hooks
└── pages/ # Route-level pages

## 🔮 Future Improvements

- AI-powered interview preparation suggestions
- Email reminders for upcoming deadlines
- Data visualization charts on dashboard
- Export application history to PDF/CSV

## 👤 Author

Mehak — www.linkedin.com/in/greatmehak

