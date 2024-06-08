const {
  findAllCampaign,
  findCampaignById,
  createCampaign,
  deleteCampaign,
} = require("../model/campaignModel");
const successResponse = require("../helper/successResponse");
const { findUserById } = require("../model/userModel");
const { uploadImage, deleteImage } = require("../helper/imageHandler");

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
      const { title, content, userId } = req.body;
      const imageFile = req.file;

      await findUserById(userId);

      const image = await uploadImage(imageFile, "campaigns");

      const newCampaign = await createCampaign({ title, content, image, userId });

      res.status(201).json(successResponse(newCampaign, "Campaign added successfully"));
    } catch (error) {
      next(error);
    }
  },

  removeCampaign: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await findCampaignById(id);

      await deleteImage(data.image, "campaigns");
      await deleteCampaign(id);

      res.status(200).json(successResponse(data, "Campaign deleted successfully"));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = campaignController;
