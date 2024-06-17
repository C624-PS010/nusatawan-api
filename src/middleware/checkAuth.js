const jwt = require("jsonwebtoken");
const { UnauthorizedError, ForbiddenError } = require("../helper/customError");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["auth-user"];

    if (!authHeader) {
      return next(new UnauthorizedError("Unauthorized access: Authorization header required"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new UnauthorizedError("Unauthorized access: Bearer token required"));
    }

    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    next(new UnauthorizedError("Unauthorized access: invalid token"));
  }
};

const authorize = (req, res, next) => {
  try {
    const authHeader = req.headers["auth-admin"];

    if (!authHeader) {
      return next(new UnauthorizedError("Forbidden access: Authorization header required"));
    }

    const adminToken = authHeader.split(" ")[1];

    if (!adminToken) {
      return next(new UnauthorizedError("Forbidden access: Bearer token required"));
    }

    jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET);
    next();
  } catch (err) {
    next(new ForbiddenError("Forbidden access: invalid token"));
  }
};

module.exports = { authenticate, authorize };
