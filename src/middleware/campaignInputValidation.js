const { BadRequestError } = require("../helper/customError");

const campaignInputValidation = async (req, res, next) => {
  const { title, content, image, userId } = req.body;

  // Validasi jika semua field ada
  if (!title || !content || !image || !userId) {
    return next(new BadRequestError("All fields are required"));
  }

  // Validasi panjang title
  if (title.length > 50) {
    return next(new BadRequestError("Title length exceed limit (25 characters)"));
  }

  // Validasi panjang content
  if (content.length > 5000) {
    return next(new BadRequestError("Content length exceed limit (25 characters)"));
  }

  // Validasi panjang image
  if (image.length > 255) {
    return next(new BadRequestError("Image length exceed limit (25 characters)"));
  }

  next();
};

module.exports = campaignInputValidation;
