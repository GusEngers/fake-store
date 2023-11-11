const { Product, Category } = require('../../../config/db');
const ResponseError = require('../../../utils/errors');

const { NODE_ENV, PRODUCTION } = require('../../../utils/constants');
const { addProductSimulation } = require('./simulation/add_product');

/**
 * Función para crear un nuevo producto en la base de datos
 * @param name Nombre del nuevo producto
 * @param description Descripción del nuevo producto
 * @param price Precio del nuevo producto
 * @param categoryId `id` de la categoría que corresponde el producto
 * @returns Nuevo producto creado
 */
async function addProduct({ name, description, price, categoryId }) {
  try {
    if (NODE_ENV === PRODUCTION) {
      const product = await addProductSimulation({ name, description, price, categoryId });
      return product;
    }

    const product = await Product.create(
      { name, description, price, categoryId },
      { include: { model: Category } }
    );
    return product;
  } catch (_) {
    const message = 'Error creating the new category';
    throw new ResponseError(message, 400);
  }
}

module.exports = { addProduct };
