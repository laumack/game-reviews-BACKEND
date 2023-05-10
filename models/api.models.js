const connection = require("../db/connection.js");

exports.fetchCategories = () => {
  return connection.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};
