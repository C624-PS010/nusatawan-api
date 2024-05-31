const { findAllArticle, findArticleById } = require("../model/articleModel");
const successResponse = require("../helper/successResponse");

const articleController = {
  getArticle: async (req, res, next) => {
    try {
      const articles = await findAllArticle();

      res.status(200).json(successResponse(articles));
    } catch (error) {
      next(error);
    }
  },

  getArticleById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await findArticleById(id);

      res.status(200).json(successResponse(article));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = articleController;
