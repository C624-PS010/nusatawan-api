const { BadRequestError } = require("../helper/customError");

const userInputValidation = (req, res, next) => {
  const { username, email, password, phone, isAdmin } = req.body;

  if (!username || !email || !password || !phone || isAdmin === undefined) {
    return next(new BadRequestError("Please provide all required fields"));
  }

  if (username.length > 25) {
    return next(new BadRequestError("Username length exceed limit (25 characters)"));
  }

  if (email.length > 100) {
    return next(new BadRequestError("Email length exceed limit (100 characters)"));
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return next(new BadRequestError("Email is not valid"));
  }

  if (phone.length > 25) {
    return next(new BadRequestError("Phone length exceed limit (25 characters)"));
  }

  if (typeof isAdmin !== "boolean") {
    return next(new BadRequestError("isAdmin must be a boolean value"));
  }

  next();
};

module.exports = userInputValidation;
