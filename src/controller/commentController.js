const {
  findAllComment,
  findAllCommentByArticleId,
  createComment,
} = require("../model/commentModel");
const successResponse = require("../helper/successResponse");
const { NotFoundError } = require("../helper/customError");

const commentController = {
  getComment: async (req, res, next) => {
    try {
      const comments = await findAllComment();

      res.status(200).json(successResponse(comments));
    } catch (error) {
      next(error);
    }
  },

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

      console.log(articleId, comment, userId);

      const newComment = await createComment({ articleId, comment, userId });

      res.status(201).json(successResponse(newComment));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = commentController;
