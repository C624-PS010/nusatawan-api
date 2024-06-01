const { Router } = require("express");
const userController = require("../controller/userController");
const { authenticate } = require("../middleware/checkAuth");
const roleInputValidation = require("../middleware/validation/roleInputValidation");

const router = Router();

// GET
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);

// PATCH
router.patch("/role/:id", roleInputValidation, userController.changeUserRole);

// DELETE
router.delete("/:id", userController.removeUser);

module.exports = router;
