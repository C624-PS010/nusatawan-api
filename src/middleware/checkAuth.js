const jwt = require("jsonwebtoken");
const { UnauthorizedError, ForbiddenError } = require("../helper/customError");

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies["user-token"];

    if (!token) {
      return next(new UnauthorizedError("Unauthorized access: user-token required"));
    }

    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    next(new UnauthorizedError("Unauthorized access: invalid user-token"));
  }
};

const authorize = (req, res, next) => {
  try {
    const adminToken = req.cookies["admin-token"];

    if (!adminToken) {
      return next(new UnauthorizedError("Forbidden access: admin-token required"));
    }

    jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET);
    next();
  } catch (err) {
    next(new ForbiddenError("Forbidden access: invalid admin-token"));
  }
};

module.exports = { authenticate, authorize };
