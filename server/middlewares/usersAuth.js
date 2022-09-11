//-----------Modules import---------
const Post = require("../models/Post");

module.exports = async (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId !== req.auth.userId) {
        res
          .status(401)
          .json("Vous n'êtes pas autorisé à modifier ou supprimer ce Post !");
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
};
