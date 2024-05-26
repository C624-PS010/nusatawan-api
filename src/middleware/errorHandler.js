const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An error occurred";
  const path = err.path || req.path;

  res.status(statusCode).json({
    status: "error",
    message: message,
    path: path,
  });
};

module.exports = errorHandler;
