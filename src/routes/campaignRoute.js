const { Router } = require("express");
const campaignController = require("../controller/campaignController");
const campaignInputValidation = require("../middleware/validation/campaignInputValidation");
const { authenticate, authorize } = require("../middleware/checkAuth");

const router = Router();

// GET
router.get("/", campaignController.getCampaign);

// GET by ID
router.get("/:id", campaignController.getCampaignById);

// POST
router.post("/", authenticate, campaignInputValidation, campaignController.addCampaign);

// DELETE
router.delete("/:id", authenticate, authorize, campaignController.removeCampaign);

module.exports = router;
