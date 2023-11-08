const { Category } = require('../../../config/db');
const ResponseError = require('../../../utils/errors');

/**
 * Función para obtener una lista de categorías almacenados
 * en la base de datos
 * @param limit Límite de categorías por consulta
 * @param offset Número de categorías a omitir
 * @returns Lista de categorías
 */
async function getCategories({ limit = 10, offset = 0 }) {
  const total = await Category.count();

  if (offset > total) {
    const message = `'offset' should not be greater than the total 'count' of categories, currently 'offset' is ${offset} and 'count' is ${total}`;
    throw new ResponseError(message, 400);
  }

  const categories = await Category.findAll({ limit, offset });
  if (!categories.length) {
    throw new ResponseError('There are no resulting categories for this query', 404);
  }
  return { total, categories, current: categories.length };
}

module.exports = { getCategories };
