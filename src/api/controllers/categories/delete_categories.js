const { Category } = require('../../../config/db');
const { categoriesLimitAndOffsetCheck } = require('../../../utils/checks');
const ResponseError = require('../../../utils/errors');

/**
 * Función para eliminar masivamente las categorías según una
 * condición dada
 * @param limit Límite de categorías por consulta
 * @param offset Número de categorías a omitir
 */
async function deleteCategories({ limit = 10, offset = 0 }) {
  await categoriesLimitAndOffsetCheck({ offset, limit }, false);

  const ids = await Category.findAll({ limit, offset, order: [['id', 'ASC']] }).then((categories) =>
    categories.map((category) => category.id)
  );

  const count = await Category.destroy({ where: {id: ids} }).catch((_) => {
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
