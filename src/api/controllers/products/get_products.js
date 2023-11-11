const { Product, Category } = require('../../../config/db');
const { productsLimitAndOffsetCheck } = require('../../../utils/checks');
const ResponseError = require('../../../utils/errors');

/**
 * Función para obtener una lista de productos según su categoría
 * @param categoryId `id` de la categoría
 * @param limit Límite de productos por consulta
 * @param offset Número de productos a omitir
 * @returns Lista de productos por categoría
 */
async function getProductsByCategory({ categoryId, limit = 10, offset = 0 }) {
  const total = await productsLimitAndOffsetCheck({ limit, offset });

  const products = await Product.findAll({
    where: { categoryId },
    include: {
      model: Category,
      attributes: {
        exclude: ['paths'],
      },
    },
    attributes: {
      exclude: ['categoryId'],
    },
    limit,
    offset,
    order: [['id', 'ASC']],
  });
  if (!products.length) {
    throw new ResponseError('There are no resulting products for this query', 404);
  }
  return { total, products, current: products.length };
}

/**
 * Función para obtener una lista de productos almacenados
 * en la base de datos
 * @param limit Límite de productos por consulta
 * @param offset Número de productos a omitir
 * @returns Lista de productos
 */
async function getProducts({ limit = 10, offset = 0 }) {
  const total = await Product.count();

  if (offset > total) {
    const message = `'offset' should not be greater than the total 'count' of products, currently 'offset' is ${offset} and 'count' is ${total}`;
    throw new ResponseError(message, 400);
  }

  const products = await Product.findAll({
    include: {
      model: Category,
      attributes: {
        exclude: ['paths'],
      },
    },
    attributes: {
      exclude: ['categoryId'],
    },
    limit,
    offset,
    order: [['id', 'ASC']],
  });
  if (!products.length) {
    throw new ResponseError('There are no resulting products for this query', 404);
  }
  return { total, products, current: products.length };
}

/**
 * Función para obtener un producto específico según su `id`
 * @param id Identificador del producto
 * @returns Objeto con información del producto
 */
async function getProduct({ id }) {
  const product = await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: {
        exclude: ['paths'],
      },
    },
    attributes: {
      exclude: ['categoryId'],
    },
  });
  if (product === null) {
    throw new ResponseError("The product doesn't exist", 404);
  }
  return product;
}

module.exports = { getProductsByCategory, getProducts, getProduct };
