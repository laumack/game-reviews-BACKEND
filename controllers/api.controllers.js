const {
  fetchAllEndpoints,
  fetchCategories,
} = require("../models/api.models.js");

exports.getAllEndpoints = (req, res, next) => {
  fetchAllEndpoints().then((endpoints) => {
    res.status(200).send({ endpoints: endpoints });
  });
};

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => res.status(200).send({ categories: categories }))
    .catch((err) => {
      next(err);
    });
};
