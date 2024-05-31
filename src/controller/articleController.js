const { findAllArticle, findArticleById, createArticle } = require("../model/articleModel");
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

  addArticle: async (req, res, next) => {
    try {
      const { title, content, location, userId } = req.body;
      const image = req.file ? req.file.path : "null"; // get the uploaded file path
      const newArticle = await createArticle({ title, content, image, location, userId });
      res.status(201).json(successResponse(newArticle, "Article added successfully"));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = articleController;
