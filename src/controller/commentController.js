const { findAllComment, findAllCommentByArticleId } = require("../model/commentModel");
const successResponse = require("../helper/successResponse");

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

      console.log(id);

      const comments = await findAllCommentByArticleId(id);

      if (comments.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Comment not found",
        });
      } else {
        return res.status(200).json(successResponse(comments));
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = commentController;
