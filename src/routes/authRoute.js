const { Router } = require("express");
const authController = require("../controller/authController");
const {
  registerInputValidation,
  loginInputValidation,
} = require("../middleware/validation/authInputValidation");

const router = Router();

// POST
router.post("/register", registerInputValidation, authController.register);
router.post("/login", loginInputValidation, authController.login);

module.exports = router;
