import { sendError } from "./response";

export function validateId(req, res, next) {
  const { id } = req.params;

  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return sendError(res, "User ID must be a positive number", 400);
  }

  next();
}