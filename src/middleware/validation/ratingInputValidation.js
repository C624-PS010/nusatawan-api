const { user } = require("../../data/nusatawanDB");
const { BadRequestError } = require("../../helper/customError");
const ratingSchema = require("../../schema/ratingSchema");

const ratingInputValidation = (req, res, next) => {
  const { id: articleId } = req.params;
  const { rating, userId } = req.body;
  console.log(articleId);
  // Check requirement
  if (!articleId || !rating || !userId) {
    return next(new BadRequestError("Please provide all required fields"));
  }

  // Check schema
  try {
    ratingSchema.parse({
      articleId,
      rating,
      userId,
    });
    next();
  } catch (error) {
    next(new BadRequestError(error.errors[0].message || error.message));
  }
};

module.exports = {
  ratingInputValidation,
};
