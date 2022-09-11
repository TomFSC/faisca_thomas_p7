//-----------Modules import---------
const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/usersCtrl");

//Route for users registration
router.post("/register", usersCtrl.signup);

//Route for users login
router.post("/login", usersCtrl.login);

module.exports = router;
