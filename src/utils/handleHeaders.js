module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, PATCH');

  const accept = req.get('accept');
  console.log(accept);
  if (accept !== undefined && accept.toLowerCase() !== 'application/json') {
    return res.status(406).json({ message: 'Not Acceptable', status: 406 });
  }
  next();
};
