//-----------Modules import---------
const Post = require("../models/Post");
const fs = require("fs");

//Create post OK

exports.addPost = async (req, res) => {
  const { userId, message, username } = req.body;
  const imageURL = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "";

  await Post.create({
    userId: userId,
    username: username,
    message: message,
    image: imageURL,
  })
    .then(() => {
      res.status(201).json({ message: "Nouveau Post créé !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Get all posts OK

exports.getPosts = async (req, res) => {
  const posts = await Post.find({}).sort({ updatedAt: "desc" }).exec();
  res.status(200).json(posts);
};

//Get one post OK

exports.getPost = async (req, res) => {
  const post = await Post.findOne({
    _id: req.params.id,
  });
  res.status(200).json(post);
};

//Update post OK

exports.updatePost = async (req, res) => {
  const { message } = req.body;
  // Check if File in request
  const postObject = req.file
    ? {
        message,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { message };
  // console.log(postObject);
  delete req.body.user_id;

  if (postObject !== null) {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        //Delete image from images folder
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images${filename}`, () => {
          //Update Database with new image
          Post.updateOne(
            { _id: req.params.id },
            { ...postObject, _: req.params.id }
          )
            .then(() => res.status(200).json("Post mis à jour !"))
            .catch((error) => res.status(401).json({ error }));
        });
      })
      .catch((error) => res.status(404).json({ error }));
  } else {
    //If no File in request
    Post.updateOne({ _id: req.params.id }, { message: message })
      .then(() => res.status(200).json("Post mis à jour !"))
      .catch((error) => res.status(401).json({ error }));
  }
};

//Delete post

exports.deletePost = async (req, res) => {
  await Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.image) {
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          post.deleteOne({ _id: req.params.id });
        });
        res.status(200).json({ message: "Post deleted !" });
      } else {
        post.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Post deleted !" });
      }
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
};
