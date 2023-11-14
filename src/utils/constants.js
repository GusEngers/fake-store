require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  OPTIONS: {
    1: { name: 'Payment Required', status: 402 },
    2: { name: 'Insufficient Funds', status: 400 },
    3: { name: 'Incorrect Data Entered', status: 403 },
    4: { name: 'Expired Card', status: 400 },
  },
  /**
   * Método para obtener la dirección URL de la API Web
   * @param req Objeto de solicitud del cliente
   * @returns Dirección URL de la API Web
   */
  path: (req) => req.protocol + '://' + req.hostname,
};
