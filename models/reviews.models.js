const connection = require("../db/connection.js");

exports.fetchReviewsById = (review_id) => {
  return connection
    .query(
      `
  SELECT *
  FROM reviews
  WHERE review_id = $1`,
      [review_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return result.rows[0];
    });
};
