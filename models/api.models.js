const connection = require("../db/connection.js");
const fs = require("fs/promises");

exports.fetchAllEndpoints = () => {
  return fs.readFile("endpoints.json", "utf-8").then((document) => {
    return document;
  });
};

exports.fetchCategories = () => {
  return connection.query("SELECT * FROM categories;").then((result) => {
    return result.rows;
  });
};
