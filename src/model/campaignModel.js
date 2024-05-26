const nusatawanDB = require("../db/nusatawanDB");
const { NotFoundError, BadRequestError } = require("../helper/customError");

const campaign = nusatawanDB.campaign;

const findAllCampaign = async () => {
  return await campaign.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

const findCampaignById = async (id) => {
  return await campaign.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      createdAt: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};

module.exports = {
  findAllCampaign,
  findCampaignById,
};
