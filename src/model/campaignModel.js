const nusatawanDB = require("../db/nusatawanDB");
const { NotFoundError } = require("../helper/customError");
const { findUserById } = require("./userModel");

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
        select: { id: true, username: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const findCampaignById = async (id) => {
  const data = await campaign.findUnique({
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
        select: { id: true, username: true },
      },
    },
  });

  if (!data) throw new NotFoundError("Campaign id not found");

  return data;
};

const createCampaign = async (newCampaignData) => {
  await findUserById(newCampaignData.userId);

  return await campaign.create({
    data: {
      title: newCampaignData.title,
      content: newCampaignData.content,
      image: newCampaignData.image,
      createdAt: new Date(),
      userId: newCampaignData.userId,
    },
  });
};

const deleteCampaign = async (id) => {
  await findCampaignById(id);

  return await campaign.delete({ where: { id } });
};

module.exports = {
  findAllCampaign,
  findCampaignById,
  createCampaign,
  deleteCampaign,
};
