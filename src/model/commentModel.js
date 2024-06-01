const nusatawanDB = require("../db/nusatawanDB");
const { findArticleById } = require("./articleModel");
const { findUserById } = require("./userModel");

const comment = nusatawanDB.comment;

const findAllCommentByArticleId = async (articleId) => {
  await findArticleById(articleId);

  return await comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createComment = async ({ comment, articleId, userId }) => {
  await findArticleById(articleId);
  await findUserById(userId);

  return await comment.create({
    data: {
      comment: comment,
      articleId: articleId,
      userId: userId,
      createdAt: new Date(),
    },
  });
};

module.exports = {
  findAllCommentByArticleId,
  createComment,
};
