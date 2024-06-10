const jwt = require("jsonwebtoken");
const { UnauthorizedError, ForbiddenError } = require("../helper/customError");

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies["user-token"];

    if (!token) {
      next(new UnauthorizedError("user-token cookie required"));
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    next(new UnauthorizedError("user-token cookie required"));
  }
};

const authorize = (req, res, next) => {
  try {
    const adminToken = req.cookies["admin-token"];

    jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET);
    next();
  } catch (err) {
    next(new ForbiddenError("Forbidden access: user is not admin"));
  }
};

module.exports = { authenticate, authorize };
