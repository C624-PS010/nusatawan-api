const categorySchema = require("../../schema/categorySchema");
const { BadRequestError } = require("../../helper/customError");

const categoryInputValidation = (req, res, next) => {
  const { name } = req.body;

  if (!name) return next(new BadRequestError("Name must be filled"));

  try {
    categorySchema.parse({ name });
    next();
  } catch (error) {
    next(new BadRequestError(error.errors[0].message || error.message));
  }
};

module.exports = categoryInputValidation;
