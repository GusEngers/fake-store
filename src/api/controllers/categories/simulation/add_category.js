const { Category } = require('../../../../config/db');

/**
 * Simula la creación de una nueva categoría
 * @param {{ name: string, description: string }} name Nombre de la nueva categoría
 * @param description Descripción de la nueva categoría
 * @returns { Promise<Category> } Categoría simulada
 */
function addCategorySimulation({ name, description }) {
  const category = new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Category({ name, description }));
    }, 1000);
  });
  return category;
}

module.exports = { addCategorySimulation };
