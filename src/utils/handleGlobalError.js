module.exports = (err, req, res, next) => {
  res.json({ msg: err.message });
};
