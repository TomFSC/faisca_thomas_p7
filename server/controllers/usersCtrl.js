//-----------Modules import---------
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//Register function

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  //Check if user allready exists
  const user = await User.findOne({
    email: email,
    username: username,
  });
  // //If user doesn't exists, hash password and create user in database
  if (!user) {
    bcrypt
      .hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
      .then((hash) => {
        User.create({
          username: username,
          email: email,
          password: hash,
        });
        res.status(201).json("Nouvel utilisateur créé !");
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else if (user) {
    res.status(409).json("Username ou Email déjà utilisé !");
  }
};

//Login function

exports.login = async (req, res) => {
  const { email, password } = req.body;

  //Chack required informations
  if (!email || !password) {
    res.status(400).json("Informations manquantes !");
  } else {
    //Check if user allready exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json("Informations incorrectes !");
    } else {
      //Compare submit password and hashed password
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json("Mauvaise combinaison Email/Mot de passe !");
          } else {
            let currentUser = {
              userId: user._id,
              username: user.username,
              isAdmin: user.isAdmin,
            };
            res.status(200).json({
              currentUser,
              token: jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "24h" }
              ),
            });
          }
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    }
  }
};
