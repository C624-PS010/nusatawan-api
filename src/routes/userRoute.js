const { Router } = require("express");
const userController = require("../controller/userController");
const { authenticate, authorize } = require("../middleware/checkAuth");
const roleInputValidation = require("../middleware/validation/roleInputValidation");

const router = Router();

// GET
router.get("/", authenticate, authorize, userController.getUsers);
router.get("/:id", userController.getUserById);

// PATCH
router.patch(
  "/role/:id",
  authenticate,
  authorize,
  roleInputValidation,
  userController.changeUserRole,
);

// DELETE
router.delete("/:id", authenticate, authorize, userController.removeUser);

module.exports = router;
