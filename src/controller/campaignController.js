const {
  findAllCampaign,
  findCampaignById,
  createCampaign,
  deleteCampaign,
} = require("../model/campaignModel");
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

  addCampaign: async (req, res, next) => {
    try {
      const newUser = await createCampaign(req.body);

      res.status(201).json(successResponse(newUser, "Campaign added successfully"));
    } catch (error) {
      next(error);
    }
  },

  removeCampaign: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCampaign = await deleteCampaign(id);

      res.status(200).json(successResponse(deletedCampaign, "Campaign deleted successfully"));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = campaignController;
