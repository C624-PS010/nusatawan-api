const { Router } = require("express");
const articleController = require("../controller/articleController");
const articleInputValidation = require("../middleware/articleInputValidation");
const commentController = require("../controller/commentController");

const router = Router();

// GET
router.get("/", articleController.getArticle);

// GET by ID
router.get("/:id", articleController.getArticleById);

// POST
router.post("/", articleInputValidation, articleController.addArticle);

// DELETE
router.delete("/:id", articleController.removeArticle);

// COMMENT
router.use("/:id/comments", commentController.getCommentByArticleId);
module.exports = router;
