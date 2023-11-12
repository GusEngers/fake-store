const productsNotAllowed = require('express').Router();

// Controladores de rutas
const { methodNotAllowed } = require('../../controllers/errorController');

// Utilidades extras
const ResponseError = require('../../../utils/errors');

// GESTIONES MASIVAS
productsNotAllowed.route('/').all((req, res, next) => {
  next(new ResponseError('Method Not Allowed', 405));
}, methodNotAllowed);

// GESTIONES ÚNICAS
productsNotAllowed.route('/:id').all((req, res, next) => {
  next(new ResponseError('Method Not Allowed', 405));
}, methodNotAllowed);

module.exports = productsNotAllowed;
