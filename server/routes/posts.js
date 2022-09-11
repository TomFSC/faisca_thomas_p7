//-----------Modules import---------
const postCtrl = require("../controllers/postsCtrl");
const likesCtrl = require("../controllers/likesCtrl");
const multer = require("../middlewares/multer-config");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const usersAuth = require("../middlewares/usersAuth");

//Create Post
router.post("/", auth, multer, postCtrl.addPost);
//Get All Posts
router.get("/", auth, postCtrl.getPosts);
//Get One Post
router.get("/:id", auth, postCtrl.getPost);
//Update Post
router.put("/:id", auth, usersAuth, multer, postCtrl.updatePost);
//Delete Post
router.delete("/:id", auth, usersAuth, multer, postCtrl.deletePost);
//Like/UnLike Post
router.put("/:id/like", auth, likesCtrl.likes);

module.exports = router;
