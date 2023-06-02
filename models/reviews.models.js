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

exports.fetchReviews = (category) => {

  console.log('Model category: ', category);
// if no category query then run the query below.
  // if category query then add this to the query below - WHERE category = $1.
// ?will the queries need to be separated or can we have a generic query string then add the 2nd argument array to this if it exists?
   
  return connection
    .query(
      `
      SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, CAST(COUNT(comments.review_id) AS INT) AS comment_count
      FROM reviews
      LEFT JOIN comments ON reviews.review_id = comments.review_id
      GROUP BY owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer
      ORDER BY created_at DESC;
      `
    )
    .then((result) => {
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

// exports.getTreasures = (sort_by = "age", sort_order = "ASC", colour) => {
//   const sortQueries = ["treasure_name", "age", "cost_at_auction"];
//   if (!sortQueries.includes(sort_by)) {
//     return Promise.reject({ status: 400, msg: "invalid sort query!" });
//   }
//   const sortOrders = ["ASC", "DESC"];
//   if (!sortOrders.includes(sort_order.toUpperCase())) {
//     return Promise.reject({ status: 400, msg: "invalid sort order query!" });
//   }

//   let queryStr = `
//     SELECT * FROM treasures
//     JOIN shops ON treasures.shop_id = shops.shop_id
//   `;
//   const values = [];
//   if (colour) {
//     queryStr += ` WHERE colour = $1`;
//     values.push(colour);
//   }

//   queryStr += ` ORDER BY ${sort_by} ${sort_order.toUpperCase()};`;

//   return db.query(queryStr, values).then((result) => {
//     return result.rows;
//   });
// };
