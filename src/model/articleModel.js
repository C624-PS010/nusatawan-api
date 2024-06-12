const nusatawanDB = require("../data/nusatawanDB");
const { NotFoundError } = require("../helper/customError");
const { findCategoryByName } = require("./categoryModel");
const { findUserById } = require("./userModel");

const article = nusatawanDB.article;

const findAllArticle = async () => {
  const data = await article.findMany({
    include: { category: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return data.map((article) => ({
    ...article,
    category: article.category.name,
    user: article.user.username,
  }));
};

const findFilteredArticle = async (search, filter) => {
  if (!search && !filter) return await findAllArticle();

  const data = await article.findMany({
    where: {
      title: { startsWith: search },
      category: { name: filter },
    },
    include: { category: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  return data.map((article) => ({
    ...article,
    category: article.category.name,
    user: article.user.username,
  }));
};

const findArticleById = async (id) => {
  const data = await article.findUnique({
    where: { id },
    include: {
      category: true,
      user: {
        select: { id: true, username: true, email: true, phone: true },
      },
      comments: {
        select: {
          id: true,
          body: true,
          createdAt: true,
          user: { select: { id: true, username: true } },
        },
      },
    },
  });

  if (!data) {
    throw new NotFoundError("Article not found");
  }

  return {
    ...data,
    category: data.category.name,
  };
};

const createArticle = async (newArticleData) => {
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
  await findArticleById(id);

  return await article.delete({ where: { id } });
};

module.exports = {
  findAllArticle,
  findFilteredArticle,
  findArticleById,
  createArticle,
  deleteArticle,
};
