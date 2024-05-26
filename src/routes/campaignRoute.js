const { Router } = require("express");
const campaignController = require("../controller/campaignController");

const router = Router();

// GET
router.get("/", campaignController.getCampaign);

// GET by ID
router.get("/:id", campaignController.getCampaignById);

module.exports = router;
