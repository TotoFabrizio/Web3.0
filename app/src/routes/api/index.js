const express = require('express');
const router = express.Router();
const apiController = require("../../controller/api/apiController");

const validateRegister = require("../../middlewares/registerValid")

router.post("/users/create", apiController.createUser)
router.get("/users/:ethAddress", apiController.findUserByWallet)

router.post("/users/register",validateRegister,apiController.updateUser)

module.exports = router;