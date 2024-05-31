const { findAllArticle } = require("../model/articleModel");
const successResponse = require("../helper/successResponse");

const articleController = {
  getArticle: async (req, res, next) => {
    try {
      const campaigns = await findAllArticle();

      res.status(200).json(successResponse(campaigns));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = articleController;
