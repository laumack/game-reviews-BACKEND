const connection = require("./connection");

exports.checkReviewExists = (review_id) => {
  if (review_id) {
    return connection
      .query(
        `
      SELECT *
      FROM reviews
      WHERE review_id = $1
      `,
        [review_id]
      )
      .then((result) => {
        if (result.rows.length === 0 && review_id) {
          return Promise.reject({ status: 404, msg: "Review ID not found" });
        }
      });
  }
};
