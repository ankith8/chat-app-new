var express = require("express");
var users = require("../controllers/user.js");
var jwt = require("../middlewares/jwt");
var decode = jwt.decode;
var encode = jwt.encode;

const router = express.Router();

router.post("/login/:userId", encode, (req, res, next) => {
  return res.status(200).json({
    success: true,
    authorization: req.authToken,
  });
});

module.exports = router;
