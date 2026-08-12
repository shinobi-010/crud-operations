export function errorHandler(err, req, res, next) {
  console.error(err.message);

  return res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Internal server error"
  });
}