const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const apiRouter = require("./api/index")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/users', usersRouter);
router.use("/api", apiRouter);

module.exports = router;
