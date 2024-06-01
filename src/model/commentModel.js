const nusatawanDB = require("../db/nusatawanDB");
const { NotFoundError, BadRequestError } = require("../helper/customError");

const comment = nusatawanDB.comment;

const findAllComment = async () => {
  return await comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findAllCommentByArticleId = async (articleId) => {
  return await comment.findMany({
    where: {
      articleId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// const findArticleById = async (id) => {
//   const foundArticle = await article.findUnique({
//     where: {
//       id,
//     },
//   });

//   if (!foundArticle) {
//     throw new NotFoundError("Article not found");
//   }

//   return foundArticle;
// };

// const createArticle = async (newArticleData) => {
//   console.log(newArticleData);
//   return await article.create({
//     data: {
//       title: newArticleData.title,
//       content: newArticleData.content,
//       image: newArticleData.image,
//       location: newArticleData.location,
//       createdAt: new Date(),
//       userId: newArticleData.userId,
//     },
//   });
// };

// const deleteArticle = async (id) => {
//   const data = await article.delete({
//     where: {
//       id: id,
//     },
//   });

//   return data;
// };

module.exports = {
  findAllComment,
  findAllCommentByArticleId,
  //   findArticleById,
  //   createArticle,
  //   deleteArticle,
};
