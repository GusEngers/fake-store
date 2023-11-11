const { categoriesHypermedia, productsHypermedia } = require('./hypermedias');

module.exports = (req, res) => {
  const options = { limit: 10, offset: 0 };
  res.status(404).json({
    message: 'Route not found',
    status: 404,
    paths: categoriesHypermedia(options)
      .concat(productsHypermedia(options))
      .map((path) => {
        return { href: path.href, action: path.action };
      }),
  });
};
