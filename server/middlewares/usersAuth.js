//-----------Modules import---------
const Post = require("../models/Post");

module.exports = async (req, res, next) => {
  const { userId, isAdmin } = req.auth;
  await Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (isAdmin || post.userId === userId) {
        next();
      } else {
        res
          .status(401)
          .json("Vous n'êtes pas autorisé à modifier ou supprimer ce Post !");
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
