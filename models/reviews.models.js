const connection = require("../db/connection.js");

exports.fetchReviewsById = (review_id) => {
  return connection
    .query(
      `SELECT *
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

exports.fetchReviews = () => {
  return connection
    .query(
      `SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, CAST(COUNT(comments.review_id) AS INT) AS comment_count
      FROM reviews
      LEFT JOIN comments ON reviews.review_id = comments.review_id
      GROUP BY owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer
      ORDER BY created_at DESC;`
    )
    .then((result) => {
      return result.rows;
    });
};
