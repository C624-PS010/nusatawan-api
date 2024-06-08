const { BadRequestError } = require("../../helper/customError");
const campaignSchema = require("../../schema/campaignSchema");
const upload = require("../../helper/multerConfig"); // Sesuaikan 'campaigns' dengan nama folder yang Anda inginkan

const campaignInputValidation = (req, res, next) => {
  // Gunakan multer untuk menangani form-data dan file upload
  upload.single("image")(req, res, (error) => {
    if (error) {
      return next(new BadRequestError(error.message));
    }

    try {
      let { title, content, userId } = req.body;
      const image = req.file;

      if (!title || !content || !image || !userId) {
        throw new BadRequestError("Please  provide all required fields");
      }

      campaignSchema.parse({ title, content, userId });
      next();
    } catch (error) {
      next(new BadRequestError(error.errors[0].message || "Validation failed", error.message));
    }
  });
};

module.exports = campaignInputValidation;
