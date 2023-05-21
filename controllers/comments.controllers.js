const {
  fetchCommentsByReviewId,
  insertCommentByReviewId,
  removeComment,
} = require("../models/comments.models.js");

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  fetchCommentsByReviewId(review_id)
    .then((comments) => res.status(200).send({ comments }))
    .catch(next);
};

exports.postCommentByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  const { body, username } = req.body;
  if (!username || !body) {
    const error = {
      status: 400,
      msg: "Missing required data",
    };
    return res.status(error.status).send(error);
  }
  insertCommentByReviewId(review_id, req.body)
    .then((comment) => res.status(201).send({ comment }))
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => res.status(204).send())
    .catch(next);
};
