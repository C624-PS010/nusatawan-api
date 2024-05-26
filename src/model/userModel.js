const nusawatawan = require("../db/nusatawanDB");
const { NotFoundError, BadRequestError } = require("../helper/customError");

const user = nusawatawan.user;

const findAllUser = async () => {
  return await user.findMany();
};

const findUserById = async (id) => {
  const data = await user.findUnique({ where: { id } });

  if (!data) throw new NotFoundError("User id not found");

  return data;
};

const findUserByEmail = async (email) => {
  const data = await user.findFirst({ where: { email } });

  if (!data) throw new NotFoundError("User email not found");

  return data;
};

const findDuplicateEmail = async (email) => {
  const data = await user.findFirst({ where: { email } });
  return data ? true : false;
};

const createUser = async (newUserData) => {
  if (await findDuplicateEmail(newUserData.email))
    throw new BadRequestError("Email is already taken");

  return await user.create({
    data: {
      username: newUserData.username,
      email: newUserData.email,
      password: newUserData.password,
      phone: newUserData.phone,
      isAdmin: newUserData.isAdmin,
    },
  });
};

const deleteUser = async (id) => {
  await findUserById(id);
  const data = await user.delete({ where: { id } });

  return data;
};

module.exports = {
  findAllUser,
  findUserById,
  createUser,
  deleteUser,
};
