const { Router } = require("express");
const articleController = require("../controller/articleController");
const articleInputValidation = require("../middleware/validation/articleinputValidation");
const commentController = require("../controller/commentController");
const { commentInputValidation } = require("../middleware/validation/commentInputValidation");
const upload = require("../helper/multerConfig");

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

// POST comment
router.delete("/:articleId/comments/:commentId", commentController.removeComment);

module.exports = router;
