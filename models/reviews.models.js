const connection = require("../db/connection.js");

exports.fetchReviewsById = (review_id) => {
  return connection
    .query(
      `
      SELECT *
      FROM reviews
      WHERE review_id = $1;
      `,
      [review_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return result.rows[0];
    });
};

exports.fetchReviews = (category, sort_by = "created_at", order = "desc") => {
  let queryStr1 = `
      SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, CAST(COUNT(comments.review_id) AS INT) AS comment_count
      FROM reviews
      LEFT JOIN comments ON reviews.review_id = comments.review_id
      `;
  let queryStr2 = `
      GROUP BY owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer
      `;
  let queryOrder = `
      ORDER BY ${sort_by} ${order.toUpperCase()}
      `;

  // the categories listed below include the INITIAL categories in the development database AND the test database
  const validCategories = [
    "euro game",
    "social deduction",
    "strategy",
    "hidden-roles",
    "dexterity",
    "push-your-luck",
    "roll-and-write",
    "deck-building",
    "engine-building",
  ];
  const validSortQueries = [
    "review_id",
    "title",
    "category",
    "designer",
    "owner",
    "created_at",
    "votes",
    "comment_count",
  ];
  const validSortOrders = ["ASC", "DESC"];
  const queryValues = [];

  if (category) {
    if (!validCategories.includes(category)) {
      return Promise.reject({ status: 404, msg: "Category not found" });
    }
    queryValues.push(category);
    queryStr1 += ` WHERE category = $1`;
  }

  if (sort_by) {
    if (!validSortQueries.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: "Invalid sort query" });
    }
  }

  if (order) {
    if (!validSortOrders.includes(order.toUpperCase())) {
      return Promise.reject({ status: 400, msg: "Invalid sort order" });
    }
  }

  const queryStr = queryStr1 + queryStr2 + queryOrder;

  return connection.query(queryStr, queryValues).then((result) => {
    return result.rows;
  });
};

exports.updateReview = (review_id, inc_votes) => {
  return connection
    .query(
      `
      UPDATE reviews
      SET votes = votes + $1
      WHERE review_id = $2
      RETURNING *;
      `,
      [inc_votes, review_id]
    )
    .then((result) => {
      return result.rows[0];
    });
};
