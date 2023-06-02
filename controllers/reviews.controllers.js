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
  console.log(req.query)
  const { category } = req.query;
  console.log('category: ', category);
  // const sort_by = '';
  // const order = '';
  fetchReviews(category)
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

// exports.getReviews = (req, res, next) => {
//   const { category, sort_by, order } = req.query;
//   fetchUsers(category, sort_by, order)
//     .then((users) => res.status(200).send({ users }))
//     .catch(next);
// };
