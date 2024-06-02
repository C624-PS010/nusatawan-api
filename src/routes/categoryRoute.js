const { Router } = require("express");
const categoryController = require("../controller/categoryController");
const categoryInputValidation = require("../middleware/validation/categoryInputValidation");

const router = Router();

// GET all categories
router.get("/", categoryController.getCategories);

// GET a category by name
router.get("/:name", categoryController.getCategoryByName);

// POST new category
router.post("/", categoryInputValidation, categoryController.addCategory);

// DELETE a category
router.delete("/:name", categoryController.removeCategory);

module.exports = router;
