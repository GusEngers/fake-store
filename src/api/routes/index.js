const api = require('express').Router();

// Rutas definidas
const products = require('./products');
const categories = require('./categories');
const payments = require('./payments');

// Métodos no permitidos
const productsNotAllowed = require('./method-not-allowed/products');
const categoriesNotAllowed = require('./method-not-allowed/categories');
const paymentsNotAllowed = require('./method-not-allowed/payments');

// Rutas configuradas
api.use('/products', products, productsNotAllowed);
api.use('/categories', categories, categoriesNotAllowed);
api.use('/payments', payments, paymentsNotAllowed);

module.exports = api;
