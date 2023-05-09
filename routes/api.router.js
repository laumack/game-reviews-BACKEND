const express = require("express");
const app = express();
const { getCategories } = require("../controllers/api.controllers.js");

//Endpoints
app.get("/api/categories", getCategories);

// Error handling
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err); //keep this console.log whilst developing to catch errors within the error chain
  res.status(500).send({ msg: "Internal Server Error!" });
});

module.exports = app;
