const { Router } = require("express");
const campaignController = require("../controller/campaignController");
const campaignInputValidation = require("../middleware/campaignInputValidation");

const router = Router();

// GET
router.get("/", campaignController.getCampaign);

// GET by ID
router.get("/:id", campaignController.getCampaignById);

// POST
router.post("/", campaignInputValidation, campaignController.addCampaign);

// DELETE
router.delete("/:id", campaignController.removeCampaign);

module.exports = router;
