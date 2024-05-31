const { Router } = require("express");
const articleController = require("../controller/articleController");

const router = Router();

// GET
router.get("/", articleController.getArticle);

// GET by ID
router.get("/:id", articleController.getArticleById);

module.exports = router;
