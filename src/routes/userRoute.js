const { Router } = require("express");
const userController = require("../controller/userController");
const { authenticate } = require("../middleware/checkAuth");
const roleInputValidation = require("../middleware/roleInputValidation");

const router = Router();

// GET
router.get("/", authenticate, userController.getUsers);
router.get("/:id", authenticate, userController.getUserById);

// PATCH
router.patch("/role/:id", authenticate, roleInputValidation, userController.changeUserRole);

// DELETE
router.delete("/:id", authenticate, userController.removeUser);

module.exports = router;
