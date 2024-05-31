const fs = require("fs");
const { BadRequestError } = require("../helper/customError");
const articleSchema = require("../schema/articleSchema");
const upload = require("../helper/multerConfig")("articles"); // Sesuaikan 'campaigns' dengan nama folder yang Anda inginkan

const articleInputValidation = (req, res, next) => {
  // Gunakan multer untuk menangani form-data dan file upload
  upload.single("image")(req, res, function (err) {
    if (err) {
      return next(new BadRequestError("File upload error: " + err.message));
    }

    let { title, content, location, userId } = req.body;
    const image = req.file ? req.file.path : "null"; // Ganti req.body.image dengan null jika tidak ada file ter-upload

    const articleData = { title, content, image, location, userId };

    try {
      // Validasi data artikel dengan schema
      articleSchema.parse(articleData);
      next(); // Lanjutkan jika validasi berhasil
    } catch (error) {
      // Hapus gambar yang telah di-upload jika terjadi error validasi
      if (req.file && req.file.path) {
        // Hapus file dari sistem file (filesystem)
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Failed to delete the file:", err);
          }
        });
      }
      // Kirimkan error validasi
      next(new BadRequestError(error.errors[0].message || "Validation failed", error.message));
    }
  });
};

module.exports = articleInputValidation;
