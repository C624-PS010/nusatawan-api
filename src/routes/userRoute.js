const { Router } = require("express");
const userController = require("../controller/userController");
const userInputValidation = require("../middleware/userInputValidation");

const router = Router();

// GET
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);

// POST
router.post("/", userInputValidation, userController.addUser);

// DELETE
router.delete("/:id", userController.removeUser);

module.exports = router;
