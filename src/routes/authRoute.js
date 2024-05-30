const { Router } = require("express");
const {
  registerInputValidation,
  loginInputValidation,
} = require("../middleware/authInputValidation");
const authController = require("../controller/authController");

const router = Router();

// POST
router.post("/register", registerInputValidation, authController.register);
router.post("/login", loginInputValidation, authController.login);

module.exports = router;
