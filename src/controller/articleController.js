const {
  findFilteredArticle,
  findArticleById,
  createArticle,
  deleteArticle,
} = require("../model/articleModel");
const successResponse = require("../helper/successResponse");
const { findUserById } = require("../model/userModel");
const { uploadImage, deleteImage } = require("../helper/imageHandler");
const { findCategoryByName } = require("../model/categoryModel");

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

      res.status(200).json(successResponse(article));
    } catch (error) {
      next(error);
    }
  },

  addArticle: async (req, res, next) => {
    try {
      const { title, content, location, categoryName, userId } = req.body;
      const imageFile = req.file;

      await findUserById(userId);
      await findCategoryByName(categoryName);

      const image = await uploadImage(imageFile, "articles");

      const newArticle = await createArticle({
        title,
        content,
        image,
        location,
        categoryName,
        userId,
      });

      res.status(201).json(successResponse(newArticle, "Article added successfully"));
    } catch (error) {
      next(error);
    }
  },

  removeArticle: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await findArticleById(id);

      await deleteImage(data.image, "articles");
      await deleteArticle(id);

      res.status(200).json(successResponse(data, "Article deleted successfully"));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = articleController;
