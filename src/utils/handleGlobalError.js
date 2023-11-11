const ResponseError = require('./errors');

module.exports = (err, req, res, next) => {
  if (err instanceof ResponseError) {
    return res.status(err.status).json(err.response);
  }
  res.status(500).json({ message: err.message, status: 500 });
};
