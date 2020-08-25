const express = require("express");
const router = express.Router();
//post model
const Posts = require("../models/Posts");

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    if (!posts) throw Error("No items found or error finding posts");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//get specific posts
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) throw Error("No items found or error finding posts");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//@routes posts /posts
router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);

  try {
    const post = await newPost.save();
    if (!post) throw Error("Something went wrong while saving the post");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if (!post) throw Error("No post found");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//update posts
router.patch("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
    if (!post) throw Error("Something in update went wrong");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
