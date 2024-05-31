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

const createArticle = async (newArticleData) => {
  console.log(newArticleData);
  return await article.create({
    data: {
      title: newArticleData.title,
      content: newArticleData.content,
      image: newArticleData.image,
      location: newArticleData.location,
      createdAt: new Date(),
      userId: newArticleData.userId,
    },
  });
};

module.exports = {
  findAllArticle,
  findArticleById,
  createArticle,
};
