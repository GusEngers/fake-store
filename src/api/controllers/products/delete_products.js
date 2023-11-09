const { Product } = require('../../../config/db');
const ResponseError = require('../../../utils/errors');

/**
 * Función para eliminar masivamente los productos según una
 * condición dada
 * @param condition Condición para eliminar los productos
 */
async function deleteProducts({ condition = {} }) {
  const count = await Product.destroy({ where: condition }).catch((_) => {
    throw new ResponseError('Error deleting products', 400);
  });
  if (count === 0) {
    throw new ResponseError(
      'There are no products that match the requested condition, or there are no records in the database',
      404
    );
  }
}

/**
 * Función para eliminar un producto según su `id`
 * @param id Identificador del producto
 */
async function deleteProduct({ id }) {
  const count = await Product.destroy({ where: { id } }).catch((_) => {
    throw new ResponseError('Error deleting product', 400);
  });
  if (count === 0) {
    throw new ResponseError("The product doesn't exist", 404);
  }
}

module.exports = { deleteProducts, deleteProduct };
