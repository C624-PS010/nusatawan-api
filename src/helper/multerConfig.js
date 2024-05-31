//helpers/multerConfig.js
const multer = require("multer");
const path = require("path");

const storage = (folderType) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      let uploadPath = `public/images/${folderType}`;

      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + `-${file.originalname}`);
    },
  });

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = (folderType) =>
  multer({
    storage: storage(folderType),
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB
    },
    fileFilter: fileFilter,
  });

module.exports = upload;
