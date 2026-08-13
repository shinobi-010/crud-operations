# 📝 Event Log 05: DELETE /api/users/:id Endpoint Implemented

**Date:** August 13, 2026  
**Status:** ✅ Completed  

---

## 🎯 Event Summary
Successfully implemented and verified the `DELETE /api/users/:id` endpoint to remove user records from the PostgreSQL database using clean layered architecture, parameterized queries, and proper HTTP error responses. Database state and API behavior were thoroughly tested and verified using **PostgreSQL**, **Postman**, and **Beekeeper Studio**.

---

## 🛠️ Actions Completed

1. **Controller Implementation**: Built `pgDeleteUser` in [`controllers/logic.controller.js`](file:///e:/backend/crud-op/controllers/logic.controller.js):
   - Extracted target `id` from `req.params`.
   - Executed parameterized SQL query to safely delete user:
     ```sql
     DELETE FROM users WHERE id = $1 RETURNING *
     ```
   - Checked query result: if `result.rows.length === 0`, returns `404 User Not Found` using `sendError(res, "user not found", 404)`.
   - On success, returns `200 OK` with deleted user record via `sendSuccess(res, result.rows[0])`.
   - Forwarded unhandled exceptions to Express global error handler via `next(err)`.

2. **Route Registration**: Connected route handler in [`routes/logic.route.js`](file:///e:/backend/crud-op/routes/logic.route.js):
   ```javascript
   router.delete("/users/:id", pgDeleteUser);
   ```

3. **Multi-Tool Verification**:
   - **Postman**: Tested HTTP `DELETE` requests against `http://localhost:3010/api/users/:id`, confirming successful deletion response as well as `404` error handling for missing IDs.
   - **Beekeeper Studio**: Verified real-time database table state, confirming row deletion and data integrity in PostgreSQL.

---

## 🎓 Mentor Assessment & Notes
- 🛡️ **SQL Injection Defense**: Dynamic ID parameter passed safely via `$1` placeholder.
- ⚡ **Database Efficiency**: Utilized PostgreSQL `RETURNING *` to confirm and return deleted record without requiring a separate pre-query.
- 🔍 **Database GUI Verification**: Combining Postman API testing with Beekeeper Studio GUI inspection ensures complete end-to-end reliability.
