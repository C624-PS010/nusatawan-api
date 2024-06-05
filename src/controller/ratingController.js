const { BadRequestError } = require("../helper/customError");
const successResponse = require("../helper/successResponse");
const {
  findAllRatingByArticleId,
  findAverageRating,
  findTotalUserRating,
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
      if (typeof rating != "number" || rating < 1 || rating > 5)
        throw new BadRequestError("Rating must be number between 1 and 5");

      // Create a new rating
      const userRating = await createRating(articleId, rating, userId);

      return res.status(201).json(successResponse(userRating, "Successfully added rating"));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ratingController;
