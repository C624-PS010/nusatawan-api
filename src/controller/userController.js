const { findAllUser, findUserById, createUser, deleteUser } = require("../model/userModel");
const successResponse = require("../helper/successResponse");

const userController = {
  getUsers: async (req, res, next) => {
    try {
      const users = await findAllUser();

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

  addUser: async (req, res, next) => {
    try {
      const newUser = await createUser(req.body);

      res.status(201).json(successResponse(newUser, `User has been successfully added`));
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
