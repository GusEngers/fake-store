const { Category } = require('../../../config/db');
const ResponseError = require('../../../utils/errors');

/**
 * Función para eliminar masivamente las categorías según una
 * condición dada
 * @param condition Condición para eliminar las categorías
 */
async function deleteCategories({ condition = {} }) {
  const count = await Category.destroy({ where: condition }).catch((_) => {
    throw new ResponseError('Error deleting categories', 400);
  });
  if (count === 0) {
    throw new ResponseError(
      'There are no categories that match the requested condition, or there are no records in the database',
      404
    );
  }
}

/**
 * Función para eliminar una categoría según su `id`
 * @param id Identificador de la categoría
 */
async function deleteCategory({ id }) {
  const count = await Category.destroy({ where: { id } }).catch((_) => {
    throw new ResponseError('Error deleting category', 400);
  });
  if (count === 0) {
    throw new ResponseError("The category doesn't exist", 404);
  }
}

module.exports = { deleteCategories, deleteCategory };
