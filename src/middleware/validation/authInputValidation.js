const { BadRequestError } = require("../../helper/customError");
const registerSchema = require("../../schema/registerSchema");
const loginSchema = require("../../schema/loginSchema");

const registerInputValidation = (req, res, next) => {
  const { username, email, password, phone } = req.body;

  // Check requirement
  if (!username || !email || !password || !phone) {
    return next(new BadRequestError("Please provide all required fields"));
  }

  // Check schema
  try {
    registerSchema.parse({ username, email, password, phone });
    next();
  } catch (error) {
    next(new BadRequestError(error.errors[0].message || error.message));
  }
};

const loginInputValidation = (req, res, next) => {
  const { email, password } = req.body;

  // Check requirement
  if (!email || !password) {
    return next(new BadRequestError("Please provide all required fields"));
  }

  // Check schema
  try {
    loginSchema.parse({ email, password });
    next();
  } catch (error) {
    next(new BadRequestError(error.errors[0].message || error.message));
  }
};

module.exports = { registerInputValidation, loginInputValidation };
