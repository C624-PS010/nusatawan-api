const nusatawanDB = require("../db/nusatawanDB");
const { NotFoundError } = require("../helper/customError");
const { findCategoryByName } = require("./categoryModel");

const article = nusatawanDB.article;

const findAllArticle = async () => {
  return await article.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

const findFilteredArticle = async (search, filter) => {
  if (!search && !filter) return await findAllArticle();

  return await article.findMany({
    where: {
      title: {
        startsWith: search,
      },
      location: filter,
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

const findArticleById = async (id) => {
  const foundArticle = await article.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      user: true,
      comments: true,
    },
  });

  if (!foundArticle) {
    throw new NotFoundError("Article not found");
  }

  return foundArticle;
};

const createArticle = async (newArticleData) => {
  await findCategoryByName(newArticleData.categoryName);

  return await article.create({
    data: {
      title: newArticleData.title,
      content: newArticleData.content,
      image: newArticleData.image,
      location: newArticleData.location,
      createdAt: new Date(),
      categoryName: newArticleData.categoryName,
      userId: newArticleData.userId,
    },
  });
};

const deleteArticle = async (id) => {
  const data = await article.delete({
    where: {
      id: id,
    },
  });

  return data;
};

module.exports = {
  findAllArticle,
  findFilteredArticle,
  findArticleById,
  createArticle,
  deleteArticle,
};
