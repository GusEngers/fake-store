const { Product } = require('../../../config/db');
const { OPTIONS } = require('../../../utils/constants');
const ResponseError = require('../../../utils/errors');

/**
 * Función para simular la gestión de pago de los productos, opcionalmente
 * se puede establecer una opción para generar distintos errores predefinidos
 * @param {{option: undefined | number | string, orders: [{id: number, count: number}]}} option Opción de error predefinido
 * @param orders Lista de `id` y cantidad de productos
 * @returns Objeto con mensaje de éxito y el monto total al proceder con el pago
 */
async function generatePayment({ option = undefined, orders }) {
  if (option !== undefined && OPTIONS.hasOwnProperty(option)) {
    throw new ResponseError(OPTIONS[option].name, OPTIONS[option].status);
  }

  let total = 0;

  for (let i = 0; i < orders.length; i++) {
    const product = await Product.findByPk(orders[i].id);
    if (product === null) {
      throw new ResponseError(
        `Payment failed because product was not found with identifier ${orders[i].id}`,
        400
      );
    }
    total += orders[i].count * product.price;
  }
  total = total.toFixed(2);
  return { message: `Payment for a total of ${total} USD completed`, total };
}

module.exports = { generatePayment };
