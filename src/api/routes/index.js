const api = require('express').Router();

const products = require('./products');
const categories = require('./categories');
const payments = require('./payments');

api.use('/products', products);
api.use('/categories', categories);
api.use('/payments', payments);

module.exports = api;
