const { Category } = require('../../config/db');
const ResponseError = require('../../utils/errors');

/**
 * Middleware que verifica si existen registros de categorías según su `id`,
 * en caso de utilizar el método para crear un nuevo producto se verificará siempre
 * la categoría, y en caso de actualizaciones de productos se puede llegar a omitir
 * esta verificación
 */
async function checkCategory(req, res, next) {
  const id = req.body.categoryId;
  try {
    if (id !== undefined) {
      const category = await Category.findByPk(id);
      if (category === null) {
        throw new ResponseError("The category doesn't exist", 404);
      }
      next();
    }
    next();
  } catch (error) {
    res.status(error.status).json(error.response);
  }
}

module.exports = { checkCategory };
