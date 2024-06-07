const nusatawanDB = require("../data/nusatawanDB");
const { NotFoundError, BadRequestError } = require("../helper/customError");
const { encrypt, decrypt } = require("../helper/encryption");

const user = nusatawanDB.user;

const findAllUser = async () => {
  return await user.findMany();
};

const findAllUserAdmin = async () => {
  return await user.findMany({ where: { isAdmin: true } });
};

const findUserById = async (id) => {
  const data = await user.findUnique({ where: { id } });

  if (!data) throw new NotFoundError("User id not found");

  return data;
};

const findUserByEmailPassword = async (email, password) => {
  const data = await user.findUnique({ where: { email } });

  if (!data || !decrypt(password, data.password))
    throw new NotFoundError("Incorrect email or password");

  return data;
};

const findDuplicateEmail = async (email) => {
  const data = await user.findUnique({ where: { email } });
  return data ? true : false;
};

const createUser = async (newUserData) => {
  if (await findDuplicateEmail(newUserData.email))
    throw new BadRequestError("Email is already taken");

  return await user.create({
    data: {
      username: newUserData.username,
      email: newUserData.email,
      password: encrypt(newUserData.password),
      phone: newUserData.phone,
    },
  });
};

const updateUserAdmin = async (id, isAdmin) => {
  await findUserById(id);

  return await user.update({
    where: { id },
    data: { isAdmin },
  });
};

const deleteUser = async (id) => {
  await findUserById(id);
  return await user.delete({ where: { id } });
};

module.exports = {
  findAllUser,
  findAllUserAdmin,
  findUserById,
  findUserByEmailPassword,
  createUser,
  updateUserAdmin,
  deleteUser,
};
