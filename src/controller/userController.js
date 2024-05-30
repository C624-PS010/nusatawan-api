const {
  findAllUser,
  findAllUserAdmin,
  findUserById,
  updateUserAdmin,
  deleteUser,
} = require("../model/userModel");
const successResponse = require("../helper/successResponse");

const userController = {
  getUsers: async (req, res, next) => {
    try {
      console.log(req.query);
      const { isAdmin } = req.query;

      const users = isAdmin === true ? await findAllUserAdmin() : await findAllUser();

      res.status(200).json(successResponse(users));
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const user = await findUserById(req.params.id);

      res.status(200).json(successResponse(user));
    } catch (error) {
      next(error);
    }
  },

  changeUserRole: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { isAdmin } = req.body;

      const updatedUser = await updateUserAdmin(id, isAdmin);

      res.status(200).json(successResponse(updatedUser, `User role has been successfully updated`));

      next();
    } catch (error) {
      next(error);
    }
  },

  removeUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedUser = await deleteUser(id);

      res.status(200).json(successResponse(deletedUser, `User has been successfully removed`));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
