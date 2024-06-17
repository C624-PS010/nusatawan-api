const { createUser, findUserByEmailPassword } = require("../model/userModel");
const { generateToken, generateAdminToken } = require("../helper/authTokenHandler");
const successResponse = require("../helper/successResponse");

const authController = {
  register: async (req, res, next) => {
    try {
      const { username, email, password, phone } = req.body;
      const newUser = await createUser({ username, email, password, phone });

      const token = {
        userToken: generateToken(newUser.id),
      };

      res
        .status(201)
        .json({ ...successResponse(newUser, `User has been successfully registered`), token });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await findUserByEmailPassword(email, password);

      const token = {
        userToken: generateToken(user.id),
        adminToken: user.isAdmin ? generateAdminToken(user.id) : "",
      };

      res.status(201).json({
        ...successResponse(user, `${user.username} has been successfully logged in`),
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
