const nusatawanDB = require("../db/nusatawanDB");
const { NotFoundError, BadRequestError } = require("../helper/customError");
const { findArticleById } = require("./articleModel");

const category = nusatawanDB.category;

// Categories
const findAllCategories = async () => {
  return await category.findMany();
};

const findCategoryByName = async (name) => {
  name = name.toLowerCase();
  const data = await category.findUnique({ where: { name } });

  if (!data) throw new NotFoundError("Category not found");

  return data;
};

const findDuplicateCategory = async (name) => {
  const duplicate = await category.findUnique({ where: { name } });

  if (duplicate) throw new BadRequestError("Category already exists");
};

const createCategory = async (name) => {
  name = name.toLowerCase();
  await findDuplicateCategory(name);

  return await category.create({ data: { name } });
};

const deleteCategoryByName = async (name) => {
  name = name.toLowerCase();
  await findCategoryByName(name);
  return await category.delete({ where: { name } });
};

// Article's categories
const findCategoriesByArticleId = async (id) => {
  await findArticleById(id);

  return;
};

module.exports = {
  findAllCategories,
  findCategoryByName,
  createCategory,
  deleteCategoryByName,
  findCategoriesByArticleId,
};
