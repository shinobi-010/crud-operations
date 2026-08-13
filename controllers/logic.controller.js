import { pool } from "../database/postgres";
import { checkUser } from "../utils/checkuser";
import { sendError, sendSuccess } from "../utils/response";

export function printinfo(req, res) {
  return res.send("hello Gemini");
}

export async function getPgUsers(req, res, next) {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    return sendSuccess(res, result.rows);
  } catch (err) {
    return next(err);
  }
}

export async function pgCreateUser(req, res, next) {
  const { name, role } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (name, role)
       VALUES ($1, $2)
       RETURNING *`,
      [name, role]
    );

    return sendSuccess(res, result.rows[0], 201);
  } catch (err) {
    return next(err);
  }
}

export async function pgUpdateUser(req, res, next) {
  const { id } = req.params;
  const { name, role } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users
       SET name = $1, role = $2
       WHERE id = $3
       RETURNING *`,
      [name, role, id]
    );

    if (!checkUser(result, res)) return;

    return sendSuccess(res, result.rows[0]);
  } catch (err) {
    return next(err);
  }
}

export async function pgDeleteUser(req, res, next) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM users
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    if (result.rows.length == 0) {
      return sendError(res, "user not found", 404);
    }
    return sendSuccess(res, result.rows[0]);
  }
  catch (err) {
    return next(err);
  }
}

export async function pgGetUserById(req, res, next) {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM users
    WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return sendSuccess(res, "user not found", 404);
    }
    return sendSuccess(res, result.rows[0]);
  }
  catch (err) {
    return next(err);
  }
}