import { sendError } from "./response";

export function checkUser(result, res) {
  if (result.rows.length === 0) {
    sendError(res, "User not found", 404);
    return false;
  }

  return true;
}