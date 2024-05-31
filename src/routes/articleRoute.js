const { Router } = require("express");
const articleController = require("../controller/articleController");
const articleInputValidation = require("../middleware/articleInputValidation");

const router = Router();

// GET
router.get("/", articleController.getArticle);

// GET by ID
router.get("/:id", articleController.getArticleById);

// POST
router.post("/", articleInputValidation, articleController.addArticle);
module.exports = router;
