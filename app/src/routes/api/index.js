const express = require('express');
const router = express.Router();
const apiController = require("../../controller/api/apiController")

router.post("/users/create", apiController.createUser)

module.exports = router;