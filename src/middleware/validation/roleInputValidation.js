const { z } = require("zod");
const { BadRequestError } = require("../../helper/customError");

const schema = z.boolean({
  message: "Value must be boolean (true/false)",
});

const roleInputValidation = (req, res, next) => {
  try {
    const { isAdmin } = req.body;
    schema.parse(isAdmin);
    next();
  } catch (error) {
    next(new BadRequestError(error.errors[0].message || error.message));
  }
};

module.exports = roleInputValidation;
