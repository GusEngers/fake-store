const { Product } = require('../../../../config/db');
const ResponseError = require('../../../../utils/errors');

/**
 * Función que simula la eliminación de un producto
 * @param id Identificador del producto
 */
async function deleteProductSimulation({ id }) {
  const product = await Product.findByPk(id);
  if (product === null) throw new ResponseError("The product doesn't exist", 404);
}

module.exports = { deleteProductSimulation };
