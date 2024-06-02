const {
  findFilteredArticle,
  findArticleById,
  createArticle,
  deleteArticle,
} = require("../model/articleModel");
const { findAllCommentByArticleId } = require("../model/commentModel");
const successResponse = require("../helper/successResponse");

const articleController = {
  // Article controllers
  getArticle: async (req, res, next) => {
    try {
      const { search, filter } = req.query;

      const articles = await findFilteredArticle(search, filter);

      res.status(200).json(successResponse(articles));
    } catch (error) {
      next(error);
    }
  },

  getArticleById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await findArticleById(id);
      const comment = await findAllCommentByArticleId(id);

      res.status(200).json(successResponse({ article, comment }));
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

  removeArticle: async (req, res, next) => {
    try {
      const { id } = req.params;
      // menunggu fungsi findArticleById selesai
      const data = await findArticleById(id);
      // menunggu fungsi deleteArticle selesai
      await deleteArticle(id);
      res.status(200).json(successResponse(data, "Article deleted successfully"));
    } catch (error) {
      next(error);
    }
  },

  // Article category controllers
  getArticleCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
    } catch (error) {
      next(error);
    }
  },
};

module.exports = articleController;
