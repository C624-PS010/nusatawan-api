const { Router } = require("express");
const campaignController = require("../controller/campaignController");

const router = Router();

// GET
router.get("/", campaignController.getCampaign);

module.exports = router;
