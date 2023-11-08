const { Category } = require('../../../config/db');
const ResponseError = require('../../../utils/errors');

/**
 * Función para actualizar masivamente las categorías según una
 * condición dada
 * @param set Nuevos datos actualizados
 * @param condition Condición para actualizar las categorías
 */
async function updateCategories({ set, condition = {} }) {
  await Category.update(set, { where: condition }).catch((_) => {
    throw new ResponseError('Error updating categories', 400);
  });
}

module.exports = { updateCategories };
