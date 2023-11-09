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

  const { rows: categories, count: current } = await Category.findAndCountAll({
    limit,
    offset,
    order: [['id', 'ASC']],
  });
  if (!current) {
    throw new ResponseError('There are no resulting categories for this query', 404);
  }
  return { total, categories, current };
}

/**
 * Función para obtener una categoría específica según su `id`
 * @param id Identificador de la categoría
 * @returns Objeto con información de la categoría
 */
async function getCategory({ id }) {
  const category = await Category.findByPk(id);
  if (category === null) {
    throw new ResponseError("The category doesn't exist", 404);
  }
  return category;
}

module.exports = { getCategories, getCategory };
