const { Router } = require("express");
const ratingController = require("../controller/ratingController");

const router = Router();

// GET all ratings for a specific article by ID
router.get("/:id", ratingController.getRatings);

// GET the average rating for a specific article by ID
router.get("/:id/average", ratingController.getAverageRating);

// GET the total number of user ratings for a specific article by ID
router.get("/:id/total", ratingController.getTotalUserRating);

module.exports = router;
