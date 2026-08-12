import { sendError } from "./response";

export function validateUser(req, res, next) {
  const { name, role } = req.body;

  if (!name || !role) {
    return sendError(res, "name and role are required", 400);
  }

  next();
}