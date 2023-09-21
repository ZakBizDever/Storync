const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//GET
router.get("/:id", userController.get_user);

//POST
router.post("/register", userController.register_user);
router.post("/login", userController.login_user);

//PUT

//DELETE
router.delete("/:id", userController.delete_user);

module.exports = router;
