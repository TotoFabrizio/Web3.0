const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validateRegister = require("../middlewares/registerValid");

/* GET users listing. */
router.get("/register", userController.register);
router.post("/register", validateRegister, userController.saveUser);

router.get("/login",userController.login);

module.exports = router;
