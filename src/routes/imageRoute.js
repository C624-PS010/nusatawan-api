const { Router } = require("express");
const imageController = require("../controller/imageController");

const router = Router();

router.get("/:folder/:file", imageController.getImage);

module.exports = router;
