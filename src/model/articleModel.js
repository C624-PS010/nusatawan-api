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

module.exports = {
  findAllArticle,
};
