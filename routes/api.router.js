const express = require("express");
const app = express();
const {
  getCategories,
  invalidPathHandler,
} = require("../controllers/api.controllers.js");

app.get("/api/categories", getCategories);
app.get("*", invalidPathHandler);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error!" });
});

module.exports = app;