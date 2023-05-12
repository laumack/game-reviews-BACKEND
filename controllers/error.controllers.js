exports.invalidPathHandler = (req, res) => {
  return res.status(404).send({ msg: "Invalid input" });
};
