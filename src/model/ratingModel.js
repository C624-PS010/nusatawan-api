const nusatawanDB = require("../db/nusatawanDB");
const { findArticleById } = require("./articleModel");
const { findUserById } = require("./userModel");

const rating = nusatawanDB.rating;

const findTotalUserRating = async (articleId) => {
  await findAllRatingByArticleId(articleId);

  return await rating.count({ where: { articleId } });
};

const findAverageRating = async (articleId) => {
  await findAllRatingByArticleId(articleId);

  return await rating.aggregate({
    _avg: { rating: true },
    where: { articleId },
  });
};

const findAllRatingByArticleId = async (articleId) => {
  await findArticleById(articleId);

  return await rating.findMany({
    where: { articleId },
  });
};

// check if user already rated the article
const findUserRating = async (articleId, userId) => {
  await findUserById(userId);
  await findArticleById(articleId);

  return await rating.findFirst({ where: { articleId, userId } });
};

const createRating = async (articleId, ratingValue, userId) => {
  await findUserById(userId);
  await findArticleById(articleId);

  try {
    return await rating.create({
      data: {
        articleId,
        rating: ratingValue,
        userId,
      },
    });
  } catch (error) {
    console.error(`Error creating rating for article ${articleId} by user ${userId}:`, error);
    throw error;
  }
};

module.exports = {
  findAllRatingByArticleId,
  findTotalUserRating,
  findAverageRating,
  findUserRating,
  createRating,
};
