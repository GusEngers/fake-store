module.exports = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  /**
   * Función para obtener la dirección URL de la API Web
   * @param req Objeto de solicitud del cliente
   * @returns Dirección URL de la API Web
   */
  path: (req) => req.protocol + '://' + req.hostname
};
