const ResponseError = require('../../utils/errors');

/**
 * Controlador para manejar los errores en los endpoints
 * de la API Web, verificando si el error obtenido es un
 * error controlado o si es un error exceptuado
 */
function errorController(err, req, res, next) {
  if (err instanceof ResponseError) {
    return res.status(err.status).json(err.response);
  }

  console.error(err);
  res.status(500).json({
    message: err.message,
    status: 500,
  });
}

module.exports = { errorController };
