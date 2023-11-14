const paymentsNotAllowed = require('express').Router();

// Controladores de rutas
const { methodNotAllowed } = require('../../controllers/errorController');

// Utilidades extras
const ResponseError = require('../../../utils/errors');

// RUTAS
paymentsNotAllowed.route('/').all((req, res, next) => {
  next(new ResponseError('Method Not Allowed', 405));
}, methodNotAllowed);

module.exports = paymentsNotAllowed;
