const successResponse = require("../helper/successResponse");
const {
  findAllRatingByArticleId,
  findAverageRating,
  findTotalUserRating,
  findUserRating,
  createRating,
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

  // POST a new rating for a specific article by ID
  addRating: async (req, res, next) => {
    try {
      const articleId = req.params.id;
      const { rating, userId } = req.body;

      // Check if rating is between 1 and 5
      if (rating < 1 || rating > 5) {
        return res.status(400).json(successResponse([], "Rating must be between 1 and 5"));
      }

      // Check if user already rated the article
      const userRating = await findUserRating(articleId, userId);
      if (userRating) {
        return res.status(400).json(successResponse([], "User already rated this article"));
      }

      // Create a new rating
      await createRating(articleId, rating, userId);

      return res.status(201).json({
        success: true,
        message: "Successfully added new rating",
        data: { articleId, rating, userId },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ratingController;
