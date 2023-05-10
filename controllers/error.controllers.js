exports.invalidPathHandler = (req, res, next) => {
  res.status(404).send({ msg: "Invalid input" });
};
