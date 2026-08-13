# 🚀 Production-Ready Express + PostgreSQL REST API

> High-performance, scalable RESTful API built with **Express.js**, **PostgreSQL**, and **Bun**, implementing clean layered architecture, validation middlewares, and centralized error handling.

---

## ⚡ Tech Stack & Tools

![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Beekeeper Studio](https://img.shields.io/badge/Beekeeper_Studio-FFD166?style=for-the-badge&logo=sqlite&logoColor=black)

---

## 🏗️ Architecture & Request Flow

```mermaid
flowchart TD
    Client["Client (Postman / Beekeeper Studio)"] -->|"HTTP Request"| BodyParser["Express JSON Body Parser"]
    BodyParser --> Router["Route Handler (/api/users)"]
  
    Router -->|"ID Routes (/users/:id)"| IDVal["validateId Middleware"]
    Router -->|"POST / PUT Body"| UserVal["validateUser Middleware"]
  
    IDVal -->|"Invalid / Non-positive ID"| ErrResp["400 Bad Request Response"]
    UserVal -->|"Missing Fields"| ErrResp
  
    IDVal -->|"Valid ID"| Controller["Controller Layer (pgGetUserById / pgCreateUser / pgUpdateUser / pgDeleteUser)"]
    UserVal -->|"Valid Body"| Controller
  
    Controller -->|"Parameterized Query ($1, $2)"| DB["PostgreSQL Database"]
    DB -->|"RETURNING * / rows"| ResponseHelper["Response Helper (sendSuccess)"]
  
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
- ⚡ **Optimized SQL Queries**: Uses `RETURNING *` in `INSERT`, `UPDATE`, and `DELETE` statements to return affected rows in a single query.
- 🎯 **Input & Parameter Validation Guards**:
  - `validateUser`: Middleware validating `name` and `role` fields in request body.
  - `validateId`: Middleware checking that dynamic URL `:id` parameters are positive integers before database execution.
- 🚨 **Centralized Error Handling**: Custom Express error handler middleware (`app.use(errorHandler)`).
- 🔍 **API Testing & GUI DB Management**: Comprehensive end-to-end verification using **Postman** for HTTP testing and **Beekeeper Studio** for PostgreSQL state inspection.
- 📜 **Progress Tracker**: Integrated event logs documenting engineering milestones in [`progress/`](file:///e:/backend/crud-op/progress/00-roadmap-overview.md).

---

## 📑 API Endpoints Specification

| Method     | Endpoint           | Description                | Status Code          | Validation Guard                      |
| :--------- | :----------------- | :------------------------- | :------------------- | :------------------------------------ |
| `GET`    | `/api/info`      | Server Health Check        | `200 OK`           | None                                  |
| `GET`    | `/api/users`     | Fetch All PostgreSQL Users | `200 OK`           | None                                  |
| `GET`    | `/api/users/:id` | Fetch Single User by ID    | `200 OK` / `404` | `validateId`                        |
| `POST`   | `/api/users`     | Create New User            | `201 Created`      | `validateUser` (`name`, `role`) |
| `PUT`    | `/api/users/:id` | Update User by ID          | `200 OK` / `404` | `validateId` & `validateUser`     |
| `DELETE` | `/api/users/:id` | Delete User by ID          | `200 OK` / `404` | `validateId`                       |

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
  "error": "User ID must be a positive number"
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
