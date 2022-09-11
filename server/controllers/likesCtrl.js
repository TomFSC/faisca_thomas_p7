//-----------Modules import---------
const Post = require("../models/Post");

exports.likes = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.auth.userId)) {
    await post.updateOne({ $push: { likes: req.auth.userId } });
    res.status(200).json("Like enregistré !");
  } else {
    await post.updateOne({ $pull: { likes: req.auth.userId } });
    res.status(200).json("Like retiré !");
  }
};
