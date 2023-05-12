const express = require("express");
const app = express();
const {
  getAllEndpoints,
  getCategories,
} = require("../controllers/api.controllers.js");
const {
  getReviews,
  getReviewById,
} = require("../controllers/reviews.controllers.js");
const { invalidPathHandler } = require("../controllers/error.controllers.js");

app.get("/api", getAllEndpoints);
app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewById);

app.all("/*", invalidPathHandler);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error!" });
});

module.exports = app;
