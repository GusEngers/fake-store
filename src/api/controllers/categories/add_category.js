const { Category } = require('../../../config/db');
const ResponseError = require('../../../utils/errors');

const { PRODUCTION, NODE_ENV } = require('../../../utils/constants');
const { addCategorySimulation } = require('./simulation/add_category');

/**
 * Función para crear una nueva categoría de productos en la
 * base de datos
 * @param name Nombre de la nueva categoría
 * @param description Descripción de la nueva categoría
 * @returns Nueva categoría creada
 */
async function addCategory({ name, description }) {
  try {
    if (NODE_ENV === PRODUCTION) {
      const category = await addCategorySimulation({ name, description });
      return category;
    }
    const category = await Category.create({ name, description });
    return category;
  } catch (_) {
    const message = 'Error creating the new category';
    throw new ResponseError(message, 400);
  }
}

module.exports = { addCategory };
