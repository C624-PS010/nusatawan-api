const { Router } = require("express");
const articleController = require("../controller/articleController");

const router = Router();

// GET
router.get("/", articleController.getArticle);

module.exports = router;
