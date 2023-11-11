const { Category } = require('../../../../config/db');
const ResponseError = require('../../../../utils/errors');

/**
 * Función que simula la eliminación de una categoría
 * @param id Identificador de la categoría
 */
async function deleteCategorySimulation({ id }) {
  const category = await Category.findByPk(id);
  if (category === null) throw new ResponseError("The category doesn't exist", 404);
}

module.exports = { deleteCategorySimulation };
