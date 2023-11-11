const ResponseError = require('../../utils/errors');

/**
 * Verifica si el `id` ingresado como parámetro es válido
 */
function checkId(req, res, next) {
  const { id } = req.params;
  try {
    if (isNaN(parseInt(id))) {
      throw new ResponseError(`The format of the 'id' is invalid`, 400);
    }
    next();
  } catch (error) {
    res.status(error.status).json(error.response);
  }
}

module.exports = { checkId };
