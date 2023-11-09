const { Product, Category } = require('../../../config/db');
const ResponseError = require('../../../utils/errors');

/**
 * Función para obtener una lista de productos según su categoría
 * @param category `id` de la categoría
 * @param limit Límite de productos por consulta
 * @param offset Número de productos a omitir
 * @returns Lista de productos por categoría
 */
async function getProductsByCategory({ category, limit = 10, offset = 0 }) {
  const total = await Product.count({ where: { categoryId: category }, include: Category });

  if (offset > total) {
    const message = `'offset' should not be greater than the total 'count' of products, currently 'offset' is ${offset} and 'count' is ${total}`;
    throw new ResponseError(message, 400);
  }

  const { rows: products, count: current } = await Product.findAndCountAll({
    where: { categoryId: category },
    include: {
      model: Category,
      attributes: {
        exclude: ['paths'],
      },
    },
    limit,
    offset,
  });
  if (!current) {
    throw new ResponseError('There are no resulting products for this query', 404);
  }
  return { total, products, current };
}

module.exports = { getProductsByCategory };
