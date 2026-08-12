# 🚀 Production-Ready Express + PostgreSQL REST API

> High-performance, scalable RESTful API built with **Express.js**, **PostgreSQL**, and **Bun**, implementing clean layered architecture, validation middleware, and centralized error handling.

---

## ⚡ Tech Stack & Tools

![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🏗️ Architecture & Request Flow

```mermaid
flowchart TD
    Client["Client (Postman / Browser)"] -->|"HTTP Request"| BodyParser["Express JSON Body Parser"]
    BodyParser --> Router["Route Handler (/api/users)"]
    Router --> Validation["validateUser Middleware"]
    
    Validation -->|"Valid Payload"| Controller["Controller Layer (pgCreateUser / pgUpdateUser)"]
    Validation -->|"Missing Fields"| ErrResp["400 Bad Request Response"]
    
    Controller -->|"Parameterized Query ($1, $2)"| DB["PostgreSQL Database"]
    DB -->|"RETURNING *"| ResponseHelper["Response Helper (sendSuccess)"]
    
    Controller -->|"Catch Error next(err)"| ErrorMiddleware["Global Error Middleware (errorHandler)"]
    ErrorMiddleware --> ErrResp2["Centralized Error Response (500 / Custom)"]
    
    ResponseHelper -->|"200 / 201 JSON"| Client
    ErrResp --> Client
    ErrResp2 --> Client
```

---

## 🔥 Key Engineering Highlights

- 🛡️ **SQL Injection Defense**: All database queries use parameterized placeholders (`$1`, `$2`) with `pg.Pool`.
- 🧩 **Clean Layered Architecture**: Strict separation of concerns across `routes/`, `controllers/`, `middlewares/`, `utils/`, and `database/`.
- ⚡ **Optimized SQL Queries**: Uses `RETURNING *` in `INSERT` and `UPDATE` statements to reduce round-trip queries.
- 🎯 **Input Validation & Error Guards**: Dedicated `validateUser` middleware for request payload safety and `checkUser` helper for `404 Not Found` handling.
- 🚨 **Centralized Error Handling**: Custom Express error handler middleware (`app.use(errorHandler)`).
- 📜 **Progress Tracker**: Integrated event logs documenting engineering milestones in [`progress/`](file:///e:/backend/crud-op/progress/00-roadmap-overview.md).

---

## 📑 API Endpoints Specification

| Method | Endpoint | Description | Status Code | Validation Guard |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/info` | Server Health Check | `200 OK` | None |
| `GET` | `/api/users` | Fetch All PostgreSQL Users | `200 OK` | None |
| `POST` | `/api/users` | Create New User | `201 Created` | `validateUser` (`name`, `role`) |
| `PUT` | `/api/users/:id` | Update User by ID | `200 OK` | `validateUser` & `checkUser` (`404`) |

---

## 📋 Standard API Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "dragon",
    "role": "Backend Developer",
    "create_at": "2026-08-12T00:14:13.689Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "name and role are required"
}
```

---

## 🛠️ Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Configure Environment (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
PORT=3010

# 3. Start Development Server with Auto-reload
bun start
```
