const nusatawanDB = require("../db/nusatawanDB");
const { NotFoundError } = require("../helper/customError");
const { findArticleById } = require("./articleModel");
const { findUserById } = require("./userModel");

const comment = nusatawanDB.comment;

const findCommentById = async (id) => {
  const data = await comment.findUnique({ where: { id } });

  if (!data) throw new NotFoundError("Comment id not found");

  return data;
};

const findAllCommentByArticleId = async (articleId) => {
  await findArticleById(articleId);

  return await comment.findMany({
    where: { articleId },
    orderBy: { createdAt: "desc" },
  });
};

const createComment = async ({ comment: body, articleId, userId }) => {
  await findArticleById(articleId);
  await findUserById(userId);

  return await comment.create({
    data: {
      body: body,
      articleId: articleId,
      userId: userId,
      createdAt: new Date(),
    },
  });
};

const deleteComment = async (articleId, commentId) => {
  await findArticleById(articleId);
  await findCommentById(commentId);

  return await comment.delete({ where: { id: commentId } });
};

module.exports = {
  findAllCommentByArticleId,
  createComment,
  deleteComment,
};
