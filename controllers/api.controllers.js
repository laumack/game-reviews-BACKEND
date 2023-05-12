const {
  fetchAllEndpoints,
  fetchCategories,
} = require("../models/api.models.js");

exports.getAllEndpoints = (req, res, next) => {
  fetchAllEndpoints()
    .then((endpoints) => {
      res.status(200).send({ endpoints: endpoints });
    })
    .catch(next);
};

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => res.status(200).send({ categories: categories }))
    .catch(next);
};
