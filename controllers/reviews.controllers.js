const { forEach } = require("../db/data/test-data/categories");
const {
  fetchReviewsById,
  fetchReviews,
  updateReview,
} = require("../models/reviews.models");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewsById(review_id)
    .then((review) => res.status(200).send({ review }))
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  const { category, sort_by } = req.query;
  // const order = '';
  fetchReviews(category, sort_by)
    .then((reviews) => res.status(200).send({ reviews }))
    .catch(next);
}; ////// QUERIES

exports.patchReview = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateReview(review_id, inc_votes)
    .then((review) => res.status(200).send({ review }))
    .catch(next);
};
