# 📝 Event Log 01: Project Setup & Database Connection

**Date:** August 12, 2026  
**Status:** ✅ Completed  

---

## 🎯 Event Summary
Initialization of the Express project running on Bun runtime with PostgreSQL database connectivity via `pg` (node-postgres), syntax fixes, and clean routing setup.

---

## 🛠️ Actions Completed
1. **Environment Setup**: Configured package dependencies (`express`, `dotenv`, `pg`, `@types/bun`).
2. **PostgreSQL Integration**: Created connection pool using `pg.Pool` in [`database/postgres.js`](file:///e:/backend/crud-op/database/postgres.js).
3. **Database Initialization**: Added auto-creation of `USERS` table with columns:
   - `id`: SERIAL PRIMARY KEY
   - `name`: VARCHAR(100) NOT NULL
   - `role`: VARCHAR(100) NOT NULL
   - `create_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
4. **Syntax & Routing Fixes**:
   - Fixed syntax error in [`controllers/logic.controller.js`](file:///e:/backend/crud-op/controllers/logic.controller.js) (closed `.json()` parenthesis & changed `result.row` to `result.rows`).
   - Cleaned up [`index.js`](file:///e:/backend/crud-op/index.js) by removing redundant `app.use('/api', getUsers)` and adding `app.use(express.json())`.
   - Exposed `/api/users` in [`routes/logic.route.js`](file:///e:/backend/crud-op/routes/logic.route.js) to query PostgreSQL database.

---

## 💡 Key Takeaway
"Before expanding feature sets, ensure base database connections, middleware, and core routing logic are sound and syntax-clean."
