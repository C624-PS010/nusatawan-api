const { Router } = require("express");
const multer = require("multer");
const imageController = require("../controller/imageController");

const router = Router();
// Store uploaded files in memory

const storage = multer.memoryStorage();
// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), imageController.postArticleImage);

module.exports = router;
