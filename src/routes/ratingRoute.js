const { Router } = require("express");
const ratingController = require("../controller/ratingController");
const { ratingInputValidation } = require("../middleware/validation/ratingInputValidation");

const router = Router();

// GET all ratings for a specific article by ID
router.get("/:id", ratingController.getRatings);

// GET the average rating for a specific article by ID
router.get("/:id/average", ratingController.getAverageRating);

// GET the total number of user ratings for a specific article by ID
router.get("/:id/total", ratingController.getTotalUserRating);

// POST a new rating for a specific article by ID
router.post("/:id", ratingInputValidation, ratingController.addRating);

module.exports = router;
