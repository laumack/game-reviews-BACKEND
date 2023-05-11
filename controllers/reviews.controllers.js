const { fetchReviewsById } = require("../models/reviews.models");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  return fetchReviewsById(review_id)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch(next);
};
