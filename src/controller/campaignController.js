const { findAllCampaign } = require("../model/campaignModel");
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
};

module.exports = campaignController;
