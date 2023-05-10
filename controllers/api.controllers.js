const { fetchCategories } = require("../models/api.models.js");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => res.status(200).send({ categories: categories }))
    .catch((err) => {
      next(err);
    });
};

