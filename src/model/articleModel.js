const nusatawanDB = require("../db/nusatawanDB");
const { NotFoundError, BadRequestError } = require("../helper/customError");

const article = nusatawanDB.article;

const findAllArticle = async () => {
  return await article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findArticleById = async (id) => {
  const foundArticle = await article.findUnique({
    where: {
      id,
    },
  });

  if (!foundArticle) {
    throw new NotFoundError("Article not found");
  }

  return foundArticle;
};

module.exports = {
  findAllArticle,
  findArticleById,
};
