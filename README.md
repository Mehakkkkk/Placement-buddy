# 🎯 Placement Preparation Tracker

A full-stack web application to help students manage their complete placement preparation journey — track job applications, interview rounds, DSA practice, and view progress on a live dashboard.


## 📋 Features

- **Secure Authentication** — JWT-based auth with BCrypt password hashing and protected routes
- **Company Application Tracker** — Add, edit, delete, and filter job applications by status (Applied, OA, Interview, Selected, Rejected)
- **Interview & OA Tracker** — Log interview rounds per company, including questions asked and personal notes
- **DSA Preparation Tracker** — Track practice questions by topic, difficulty, and solve status, with filtering
- **Live Dashboard** — Real-time stats: total applications, stage-wise breakdown, DSA solve progress

## 🛠️ Tech Stack

**Frontend:** React.js, React Router, Axios, Vite
**Backend:** Java, Spring Boot, Spring Security, Spring Data JPA (Hibernate)
**Database:** MySQL
**Authentication:** JWT (JJWT), BCrypt

## 🏗️ Architecture

React (Frontend) → REST API (Spring Boot) → MySQL Database

The frontend and backend are fully decoupled, communicating exclusively over HTTP via a RESTful API. Authentication uses JWT tokens validated by a custom Spring Security filter, ensuring all data access is scoped to the logged-in user. The backend follows a layered architecture — Controller → Service → Repository — for clear separation of concerns.

## 🗄️ Database Schema

- **users** — stores account credentials (hashed passwords)
- **companies** — job applications, linked to `users` via `user_id`
- **interview_rounds** — OA/interview details, linked to `companies` via `company_id`
- **dsa_questions** — practice questions, linked to `users` via `user_id`

All relationships enforce referential integrity via foreign keys.

## 🔐 Security Highlights

- Passwords hashed with BCrypt (never stored in plain text)
- JWT-based authentication with protected routes, validated on every request via a custom Spring Security filter
- Ownership checks at the service layer — users can only access their own data
- Spring Data JPA / Hibernate handles all database queries (protects against SQL injection by design)

## 🚀 Getting Started

### Prerequisites
- Java 21+
- Node.js (v18+)
- MySQL (v8+)

### Backend Setup
```bash
cd backend_java
# Configure DB credentials and JWT secret in src/main/resources/application.properties
./mvnw spring-boot:run
```
Runs on `http://localhost:8080`.

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`.

## 📁 Project Structure

placement-tracker/
├── backend_java/
│ └── src/main/java/com/placementtracker/backend/
│ ├── controller/ # REST endpoints
│ ├── service/ # Business logic
│ ├── repository/ # Data access (Spring Data JPA)
│ ├── entity/ # JPA entities (DB tables)
│ ├── dto/ # Request/response objects
│ └── security/ # JWT filter, security config
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
- Global exception handling via `@ControllerAdvice`
- Move secrets (DB password, JWT secret) to environment variables

## Screenshots
<img width="1920" height="1013" alt="Screenshot (391)" src="https://github.com/user-attachments/assets/3ccaba81-52fa-458f-a53c-2ec41a6c779b" />
<img width="1920" height="1013" alt="Screenshot (392)" src="https://github.com/user-attachments/assets/2e4d8e93-292e-4461-8c35-bc3a73dda149" />
<img width="1920" height="939" alt="Screenshot (393)" src="https://github.com/user-attachments/assets/4479e7bc-4015-40bb-bf25-3dd3fc11f805" />
<img width="1920" height="1080" alt="Screenshot (394)" src="https://github.com/user-attachments/assets/51382d45-1ec3-4bd7-a7ad-833970cb77f1" />
<img width="1920" height="1009" alt="Screenshot (395)" src="https://github.com/user-attachments/assets/09c3cd94-b7bf-4e1a-838e-31f7299ec91d" />


## 👤 Author

Mehak — www.linkedin.com/in/greatmehak
