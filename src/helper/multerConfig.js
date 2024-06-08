//helpers/multerConfig.js
const multer = require("multer");
const { BadRequestError } = require("./customError");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Allowed file types
  const validMimeTypes = ["image/png", "image/jpeg", "image/jpg"];

  // Check if the file type is valid
  if (validMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new BadRequestError("Invalid file type. Only Image PNG/JPG/JPEG are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024, // 1MB
  },
  fileFilter: fileFilter,
});

module.exports = upload;
