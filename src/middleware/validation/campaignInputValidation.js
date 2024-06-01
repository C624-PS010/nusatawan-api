const { BadRequestError } = require("../../helper/customError");
const campaignSchema = require("../../schema/campaignSchema");
const upload = require("../../helper/multerConfig")("campaigns"); // Sesuaikan 'campaigns' dengan nama folder yang Anda inginkan

const campaignInputValidation = (req, res, next) => {
  // Gunakan multer untuk menangani form-data dan file upload
  upload.single("image")(req, res, function (err) {
    if (err) {
      return next(new BadRequestError("File upload error: " + err.message));
    }

    let { title, content, userId } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    const campaignData = { title, content, image, userId };

    try {
      campaignSchema.parse(campaignData);
      next();
    } catch (error) {
      next(new BadRequestError(error.errors[0].message || "Validation failed", error.message));
    }
  });
};

module.exports = campaignInputValidation;
