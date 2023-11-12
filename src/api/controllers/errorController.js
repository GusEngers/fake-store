const ResponseError = require('../../utils/errors');
const { allHypermedia } = require('../../utils/hypermedias');

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

/**
 * Controlador para manejar los errores de acceso a rutas con métodos
 * que no están permitidos para esa ruta
 */
function methodNotAllowed(err, req, res, next) {
  const response = {
    ...err.response,
    paths: allHypermedia(),
  };
  res.status(err.status).json(response);
}

module.exports = { errorController, methodNotAllowed };
