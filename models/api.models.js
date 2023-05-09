const connection = require("../db/connection.js");

exports.fetchCategories = () => {
  console.log("in the model");
  return connection.query("SELECT * FROM categories;").then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Invalid input" });
    }
    return result.rows;
  });
};
