const { fetchCategories } = require("../models/api.models.js");

exports.getCategories = (req, res, next) => {
  console.log("in the controller");
    fetchCategories()
        .then((categories) => res.status(200).send({ categories: categories }))
        .catch((err) => {
            console.log("inside catch!", err);
            next(err);
        });
};
