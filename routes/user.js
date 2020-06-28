var express = require("express");

var user = require('../controllers/user.js')

const router = express.Router();

router
    .get('/',user.onGetAllUsers)
    .post('/',user.onCreateUser)
    .get('/:id',user.onGetUserById)
    .delete('/:id',user.onDeleteUserById)

module.exports = router;