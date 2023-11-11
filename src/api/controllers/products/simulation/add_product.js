const { Product, Category } = require('../../../../config/db');

/**
 * Simula la creación de un nuevo producto
 * @param {{ name: string, description: string, price: number, categoryId: number }} name Nombre del nuevo producto
 * @param description Descripción del nuevo producto
 * @param price Precio del nuevo producto
 * @param categoryId `id` de la categoría que corresponde el producto
 * @returns { Promise<Product> } Producto simulado
 */
function addProductSimulation({ name, description, price, categoryId }) {
  const product = new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        new Product({ name, description, price, categoryId }, { include: { model: Category } })
      );
    }, 1000);
  });
  return product;
}

module.exports = { addProductSimulation };
