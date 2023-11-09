const { Category } = require('../../../config/db');
const ResponseError = require('../../../utils/errors');

/**
 * Función para actualizar masivamente las categorías según una
 * condición dada
 * @param set Nuevos datos actualizados
 * @param condition Condición para actualizar las categorías
 */
async function updateCategories({ set, condition = {} }) {
  const count = await Category.update(set, { where: condition }).catch((_) => {
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
