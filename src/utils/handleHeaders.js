/**
 * Controlador para verificar/establecer encabezados
 * @param {Request} req Solicitud del cliente
 * @param {Response} res Respuesta del servidor
 */
module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, PATCH');

  // const accept = req.get('accept');

  // const condition =
  //   req.method === 'GET' &&
  //   accept !== undefined &&
  //   !accept.toLowerCase().includes('application/json');

  // if (condition) {
  //   return res.status(406).json({
  //     message: 'Not Acceptable',
  //     status: 406,
  //     errors: [`It will only reply with 'content-type: application/json'`],
  //   });
  // }
  next();
};
