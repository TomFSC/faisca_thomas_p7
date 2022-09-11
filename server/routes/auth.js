//-----------Modules import---------
const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authCtrl");

//Route for users registration
router.post("/register", authCtrl.signup);

//Route for users login
router.post("/login", authCtrl.login);

module.exports = router;
