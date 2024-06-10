const { Router } = require("express");
const articleController = require("../controller/articleController");
const articleInputValidation = require("../middleware/validation/articleinputValidation");
const commentController = require("../controller/commentController");
const { commentInputValidation } = require("../middleware/validation/commentInputValidation");
const upload = require("../helper/multerConfig");
const { authenticate, authorize } = require("../middleware/checkAuth");

const router = Router();

// GET
router.get("/", articleController.getArticle);

// GET by ID
router.get("/:id", articleController.getArticleById);

// POST
router.post("/", authenticate, articleInputValidation, articleController.addArticle);

// DELETE
router.delete("/:id", authenticate, authorize, articleController.removeArticle);

// COMMENT
// GET comment by article ID
router.get("/:id/comments", commentController.getCommentByArticleId);

// POST comment
router.post("/:id/comments", authenticate, commentInputValidation, commentController.addComment);

// DELETE comment
router.delete(
  "/:articleId/comments/:commentId",
  authenticate,
  authorize,
  commentController.removeComment,
);

module.exports = router;
