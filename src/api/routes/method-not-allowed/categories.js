const categoriesNotAllowed = require('express').Router();

// Controladores de rutas
const { methodNotAllowed } = require('../../controllers/errorController');

// Utilidades extras
const ResponseError = require('../../../utils/errors');

// GESTIONES MASIVAS
categoriesNotAllowed.route('/').all((req, res, next) => {
  next(new ResponseError('Method Not Allowed', 405));
}, methodNotAllowed);

// GESTIONES ÚNICAS
categoriesNotAllowed.route('/:id').all((req, res, next) => {
  next(new ResponseError('Method Not Allowed', 405));
}, methodNotAllowed);

// GESTIONES EXTRAS
categoriesNotAllowed.route('/:id/products').all((req, res, next) => {
  next(new ResponseError('Method Not Allowed', 405));
}, methodNotAllowed);

module.exports = categoriesNotAllowed;
