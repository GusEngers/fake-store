const { Category } = require('../../../config/db');
const { categoriesLimitAndOffsetCheck } = require('../../../utils/checks');
const ResponseError = require('../../../utils/errors');

/**
 * Función para actualizar masivamente las categorías según una
 * condición dada
 * @param set Nuevos datos actualizados
 * @param limit Límite de categorías por consulta
 * @param offset Número de categorías a omitir
 */
async function updateCategories({ set, limit = 10, offset = 0 }) {
  await categoriesLimitAndOffsetCheck({ offset, limit }, false);

  const ids = await Category.findAll({ limit, offset, order: [['id', 'ASC']] }).then((categories) =>
    categories.map((category) => category.id)
  );
  const count = await Category.update(set, { where: { id: ids } }).catch((_) => {
    throw new ResponseError('Error updating categories', 400);
  });
  if (count[0] === 0) {
    throw new ResponseError(
      'There are no categories that match the requested condition, or there are no records in the database',
      404
    );
  }
}

/**
 * Función para actualizar una categoría según su `id`
 * @param set Nuevos datos actualizados
 * @param id Identificador de la categoría
 */
async function updateCategory({ id, set }) {
  const count = await Category.update(set, { where: { id } }).catch((_) => {
    throw new ResponseError('Error updating category', 400);
  });
  if (count[0] === 0) {
    throw new ResponseError("The category doesn't exist", 404);
  }
}

module.exports = { updateCategories, updateCategory };
