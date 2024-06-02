const {
  findAllCategories,
  createCategory,
  findCategoryByName,
  deleteCategoryByName,
} = require("../model/categoryModel");
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

  addCategory: async (req, res, next) => {
    try {
      const { name } = req.body;
      const newCategory = await createCategory(name);
      res.status(201).json(successResponse(newCategory, "Successfully added new category"));
    } catch (error) {
      next(error);
    }
  },

  removeCategory: async (req, res, next) => {
    try {
      const { name } = req.params;
      const deletedCategory = await deleteCategoryByName(name);
      res.status(200).json(successResponse(deletedCategory, "Successfully deleted category"));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController;
