const ResponseError = require('./errors');

/**
 * Controlador para manejo de errores globales
 * @param {Error} err Error generado
 * @param {Request} req Solicitud del cliente
 * @param {Response} res Respuesta del servidor
 */
module.exports = (err, req, res, next) => {
  if (err instanceof ResponseError) {
    return res.status(err.status).json(err.response);
  }
  res.status(500).json({ message: err.message, status: 500 });
};
