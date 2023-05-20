const {
  fetchCommentsByReviewId,
  insertCommentByReviewId,
} = require("../models/comments.models.js");

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  return fetchCommentsByReviewId(review_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
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
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
