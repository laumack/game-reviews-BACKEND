const connection = require("../db/connection.js");
const { checkReviewExists } = require("../db/utils.js");

exports.fetchCommentsByReviewId = (review_id) => {
  return checkReviewExists(review_id)
    .then(() => {
      return connection.query(
        `
          SELECT *
          FROM comments
          WHERE review_id = $1
          ORDER BY created_at DESC;
          `,
        [review_id]
      );
    })
    .then((result) => {
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
  );
};
