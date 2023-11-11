const { Product } = require('../../../config/db');
const { productsLimitAndOffsetCheck } = require('../../../utils/checks');
const ResponseError = require('../../../utils/errors');

/**
 * Función para actualizar masivamente los productos según una
 * condición dada
 * @param set Nuevos datos actualizados
 * @param limit Límite de productos por consulta
 * @param offset Número de productos a omitir
 */
async function updateProducts({ set, limit = 10, offset = 0 }) {
  await productsLimitAndOffsetCheck({ limit, offset }, false);

  const ids = await Product.findAll({ limit, offset, order: [['id', 'ASC']] }).then((products) =>
    products.map((product) => product.id)
  );
  const count = await Product.update(set, { where: { id: ids } }).catch((_) => {
    throw new ResponseError('Error updating products', 400);
  });
  if (count[0] === 0) {
    throw new ResponseError(
      'There are no products that match the requested condition, or there are no records in the database',
      404
    );
  }
}

/**
 * Función para actualizar un producto según su `id`
 * @param set Nuevos datos actualizados
 * @param id Identificador del producto
 */
async function updateProduct({ id, set }) {
  const count = await Product.update(set, { where: { id } }).catch((_) => {
    throw new ResponseError('Error updating product', 400);
  });
  if (count[0] === 0) {
    throw new ResponseError("The product doesn't exist", 404);
  }
}

module.exports = { updateProducts, updateProduct };
