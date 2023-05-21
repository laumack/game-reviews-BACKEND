const connection = require("../db/connection.js");

exports.fetchCommentsByReviewId = (review_id) => {
  return connection
    .query(
      `
      SELECT *
      FROM comments
      WHERE review_id = $1
      ORDER BY created_at DESC;
      `,
      [review_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return result.rows;
    });
};

exports.insertCommentByReviewId = (review_id, newComment) => {
  const { body, username } = newComment;
  return connection
    .query(
      `
      INSERT INTO comments (body, author, review_id)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [body, username, review_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};

exports.removeComment = (comment_id) => {
  return connection
    .query(
      `
      DELETE FROM comments
      WHERE comment_id = $1;
      `,
      [comment_id]
    )
};
