const { findAllCategories, findCategoryByName } = require("../model/categoryModel");
const successResponse = require("../helper/successResponse");

const categoryController = {
  // Category
  getCategories: async (req, res, next) => {
    try {
      const categories = await findAllCategories();

      res.status(200).json(successResponse(categories, "Success"));
    } catch (error) {
      next(error);
    }
  },

  getCategoryByName: async (req, res, next) => {
    try {
      const { name } = req.params;
      const category = await findCategoryByName(name);

      res.status(200).json(successResponse(category, "Success"));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController;
