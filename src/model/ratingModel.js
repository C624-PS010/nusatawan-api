const nusatawanDB = require("../db/nusatawanDB");

const rating = nusatawanDB.rating;

const findTotalUserRating = async (articleId) => {
  return await rating.count({
    where: {
      articleId,
    },
  });
};

const findAverageRating = async (articleId) => {
  return await rating.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      articleId,
    },
  });
};

const findAllRatingByArticleId = async (articleId) => {
  return await rating.findMany({
    where: {
      articleId,
    },
  });
};

module.exports = {
  findAllRatingByArticleId,
  findTotalUserRating,
  findAverageRating,
};
