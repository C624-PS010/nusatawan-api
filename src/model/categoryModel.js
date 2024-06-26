const nusatawanDB = require("../data/nusatawanDB");
const { NotFoundError } = require("../helper/customError");

const category = nusatawanDB.category;

// Categories
const findAllCategories = async () => {
  return await category.findMany();
};

const findCategoryByName = async (name) => {
  name = name.toLowerCase();
  const data = await category.findUnique({ where: { name }, include: { articles: true } });

  if (!data) throw new NotFoundError("Category not found");

  return data;
};

module.exports = {
  findAllCategories,
  findCategoryByName,
};
