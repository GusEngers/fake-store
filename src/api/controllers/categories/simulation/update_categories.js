const { Category } = require('../../../../config/db');
const ResponseError = require('../../../../utils/errors');

/**
 * Función que simula la actulización de la categoría
 * @param id Identificador de la categoría
 */
async function updateCategorySimulation({ id }) {
  const category = await Category.findByPk(id);
  if (category === null) throw new ResponseError("The category doesn't exist", 404);
}

module.exports = { updateCategorySimulation };
