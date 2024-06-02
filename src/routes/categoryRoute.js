const { Router } = require("express");
const categoryController = require("../controller/categoryController");

const router = Router();

// GET all categories
router.get("/", categoryController.getCategories);

// GET a category by name
router.get("/:name", categoryController.getCategoryByName);

module.exports = router;
