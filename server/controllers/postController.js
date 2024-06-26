import PostModel from "../models/Post.js";
import { ObjectId } from "mongodb";

export const createPost = async (req, res) => {
  const name = req.body.postName;
  const description = req.body.description;

  try {
    const newPost = new PostModel({
      name,
      description,
    });

    await newPost.save();
    res.status(200).json({
      Status: "Success",
      message: "Post Created successfully!",
      post: newPost,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.aggregate([
      {
        $match: {},
      },
      {
        $project: {
          id: "$_id",
          _id: 0,
          name: 1,
          description: 1,
          personnel: 1,
        },
      },
    ]);

    return res.status(200).json({
      Status: "Success",
      message: "Fetched Posts!",
      posts,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const assignPost = async (req, res) => {
  let postId = req.body.postId;
  let personnel = req.body.username;
  let personnelId = req.body.userId;

  let post = await PostModel.findOne({ _id: ObjectId(postId) });
  if (!post) {
    return res.status(400).json({ msg: "Post doesnt exist" });
  }

  try {
    await PostModel.findOneAndUpdate(
      { _id: ObjectId(postId) },
      { $set: { personnel, personnelId } },
      { returnOriginal: false }
    ).then((response) => {
      if (response) {
        let data = response;
        res.status(200).json({
          Status: "SUCCESS",
          message: "assigned post successfuly!",
          data,
        });
      } else {
        res.status(500).json({
          Status: "FAILED",
          message: "Could not assign post",
        });
      }
    });
  } catch (e) {
    logger.log(e);
  }
};
