const {
  fetchReviewsById,
  fetchReviews,
  fetchCommentsByReviewId,
} = require("../models/reviews.models");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  return fetchReviewsById(review_id)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((reviews) => res.status(200).send({ reviews: reviews }))
    .catch(next);
};

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  return fetchCommentsByReviewId(review_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch(next);
};
