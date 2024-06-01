const { Router } = require("express");
const articleController = require("../controller/articleController");
const articleInputValidation = require("../middleware/articleInputValidation");
const commentController = require("../controller/commentController");
const { commentInputValidation } = require("../middleware/commentInputValidation");

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
// GET comment by article ID
router.get("/:id/comments", commentController.getCommentByArticleId);

// POST comment
router.post("/:id/comments", commentInputValidation, commentController.addComment);
module.exports = router;
