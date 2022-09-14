//-----------Modules import---------
const Post = require("../models/Post");

exports.likes = async (req, res) => {
  //Get the post with params
  const post = await Post.findById(req.params.id);
  if (req.auth.userId !== post.userId) {
    //Check if user allready like the post, if not, insert userId in likes array
    //else pull-it from likes array
    if (!post.likes.includes(req.auth.userId)) {
      await post.updateOne({ $push: { likes: req.auth.userId } });
      res.status(200).json("Like enregistré !");
    } else {
      await post.updateOne({ $pull: { likes: req.auth.userId } });
      res.status(200).json("Like retiré !");
    }
  } else {
    res.status(401).json("Vous ne pouvez pas liker vos posts !");
  }
};
