const { createUser, findUserByEmailPassword } = require("../model/userModel");
const { generateToken, generateAdminToken } = require("../helper/authTokenHandler");
const successResponse = require("../helper/successResponse");

const authController = {
  register: async (req, res, next) => {
    try {
      const { username, email, password, phone } = req.body;
      const newUser = await createUser({ username, email, password, phone });

      const token = generateToken(newUser.id);

      res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

      res.status(201).json(successResponse(newUser, `User has been successfully registered`));
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await findUserByEmailPassword(email, password);

      const token = generateToken(user.id);
      res.cookie("user-token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

      if (user.isAdmin) {
        const adminToken = generateAdminToken(user.id);
        res.cookie("admin-token", adminToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      }

      res
        .status(201)
        .json(successResponse(user, `${user.username} has been successfully logged in`));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
