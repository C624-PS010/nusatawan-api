const { BadRequestError } = require("../../helper/customError");
const upload = require("../../helper/multerConfig");
const articleSchema = require("../../schema/articleSchema");

const articleInputValidation = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (error) {
      return next(new BadRequestError(error.message));
    }

    try {
      const { title, content, location, categoryName, userId } = req.body;
      const image = req.file;

      if (!title || !content || !image || !location || !categoryName || !userId) {
        throw new BadRequestError("Please provide all required fields");
      }

      articleSchema.parse({ title, content, categoryName, location, userId });
      next();
    } catch (error) {
      next(new BadRequestError(error.errors[0].message || "Validation failed", error.message));
    }
  });
};

module.exports = articleInputValidation;
