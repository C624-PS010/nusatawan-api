const { findAllCampaign, findCampaignById } = require("../model/campaignModel");
const successResponse = require("../helper/successResponse");

const campaignController = {
  getCampaign: async (req, res, next) => {
    try {
      const campaigns = await findAllCampaign();

      res.status(200).json(successResponse(campaigns));
    } catch (error) {
      next(error);
    }
  },

  getCampaignById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const campaign = await findCampaignById(id);

      res.status(200).json(successResponse(campaign));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = campaignController;
