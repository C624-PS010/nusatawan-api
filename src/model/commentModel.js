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

const createComment = async (newCommentData) => {
  return await comment.create({
    data: {
      comment: newCommentData.comment,
      articleId: newCommentData.articleId,
      userId: newCommentData.userId,
      createdAt: new Date(),
    },
  });
};

module.exports = {
  findAllComment,
  findAllCommentByArticleId,
  createComment,
};
