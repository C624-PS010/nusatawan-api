const successResponse = require("../helper/successResponse");
const {
  findAllRatingByArticleId,
  findAverageRating,
  findTotalUserRating,
} = require("../model/ratingModel");

const ratingController = {
  getRatings: async (req, res, next) => {
    try {
      const articleId = req.params.id;
      const ratings = await findAllRatingByArticleId(articleId);

      if (!ratings.length) {
        return res.status(404).json(successResponse([], "No ratings found for this article ID"));
      }

      res.status(200).json(successResponse(ratings, "Success get all ratings by article id"));
    } catch (error) {
      next(error);
    }
  },

  getAverageRating: async (req, res, next) => {
    try {
      const articleId = req.params.id;
      const averageRating = await findAverageRating(articleId);
      res
        .status(200)
        .json(successResponse(averageRating, "Success get average rating by article id"));
    } catch (error) {
      next(error);
    }
  },

  getTotalUserRating: async (req, res, next) => {
    try {
      const articleId = req.params.id;
      const totalUserRating = await findTotalUserRating(articleId);
      res
        .status(200)
        .json(successResponse(totalUserRating, "Success get total user rating by article id"));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ratingController;
