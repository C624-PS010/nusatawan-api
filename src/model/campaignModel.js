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

module.exports = {
  findAllCampaign,
};
