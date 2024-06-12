const nusatawanDB = require("../data/nusatawanDB");
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
  const existedRating = await findUserRating(articleId, userId);

  if (existedRating) await rating.delete({ where: { id: existedRating.id } });

  return await rating.create({
    data: {
      articleId,
      rating: ratingValue,
      userId,
    },
  });
};

module.exports = {
  findAllRatingByArticleId,
  findTotalUserRating,
  findAverageRating,
  findUserRating,
  createRating,
};
