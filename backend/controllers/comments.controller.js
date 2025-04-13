import Comment from "../models/comment.model.js";

export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ pin: postId })
    .populate("user", "username img displayName")
    .sort({ createdAt: -1 });

  res.status(200).send(comments);
};

export const addComment = async (req, res) => {
  const { description, pinId } = req.body;

  const comment = await Comment.create({
    pin: pinId,
    description,
    user: req.userId,
  });

  res.status(201).send(comment);
};
