//-----------Modules import---------
const Post = require("../models/Post");

module.exports = async (req, res, next) => {
  //Get userId and isAdmin send in auth
  const { userId, isAdmin } = req.auth;
  //Get the post
  await Post.findOne({ _id: req.params.id })
    .then((post) => {
      //Check if user who send the request is the post user or if is admin
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
