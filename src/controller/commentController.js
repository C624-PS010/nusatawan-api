const {
  findAllCommentByArticleId,
  createComment,
  deleteComment,
} = require("../model/commentModel");
const successResponse = require("../helper/successResponse");

const commentController = {
  getCommentByArticleId: async (req, res, next) => {
    try {
      const { id } = req.params;

      const comments = await findAllCommentByArticleId(id);

      if (comments.length === 0) {
        return res.status(200).json(successResponse(comments));
      } else {
        return res.status(200).json(successResponse(comments));
      }
    } catch (error) {
      next(error);
    }
  },

  addComment: async (req, res, next) => {
    try {
      const { id: articleId } = req.params;
      const { comment, userId } = req.body;

      const newComment = await createComment({ articleId, comment, userId });

      res.status(201).json(successResponse(newComment));
    } catch (error) {
      next(error);
    }
  },

  removeComment: async (req, res, next) => {
    try {
      const { articleId, commentId } = req.params;

      const removedComment = await deleteComment(articleId, commentId);

      res.status(200).json(successResponse(removedComment, "Successfully deleted comment"));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = commentController;
