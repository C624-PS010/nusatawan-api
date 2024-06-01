const { BadRequestError } = require("../helper/customError");
const commentSchema = require("../schema/commentSchema");

const commentInputValidation = (req, res, next) => {
  const { id: articleId } = req.params;
  const { comment, userId } = req.body;

  // Check requirement
  if (!comment || !userId || !articleId) {
    return next(new BadRequestError("Please provide all required fields"));
  }

  // Check schema
  try {
    commentSchema.parse({ comment, userId, articleId });
    next();
  } catch (error) {
    next(new BadRequestError(error.errors[0].message || error.message));
  }
};

module.exports = { commentInputValidation };
