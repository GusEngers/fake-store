const products = require('express').Router();

// Controladores de rutas
const { errorController } = require('../controllers/errorController');
const { addProduct } = require('../controllers/products/add_product');

// Utilidades extras
const { path } = require('../../utils/constants');

// GESTIONES MASIVAS
products
  .route('/')
  .post(async (req, res, next) => {
    // Middleware que gestiona la creación de nuevos productos
    try {
      const { name, description, price, category } = req.body;
      const product = await addProduct({ name, description,price, category });
      res.setHeader('Location', `${path(req)}/api/products/${product.id}`);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }, errorController)
  .get(async (req, res, next) => {
    try {
      res.json({ msg: 'Obtener productos' });
    } catch (error) {
      next(error);
    }
  }, errorController)
  .put(async (req, res, next) => {
    try {
      res.json({ msg: 'Actualizar productos' });
    } catch (error) {
      next(error);
    }
  }, errorController)
  .delete(async (req, res, next) => {
    try {
      res.json({ msg: 'Eliminar productos' });
    } catch (error) {
      next(error);
    }
  }, errorController);

products
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      res.json({ msg: 'Obtener producto' });
    } catch (error) {
      next(error);
    }
  }, errorController)
  .put(async (req, res, next) => {
    try {
      res.json({ msg: 'Actualizar producto' });
    } catch (error) {
      next(error);
    }
  }, errorController)
  .delete(async (req, res, next) => {
    try {
      res.json({ msg: 'Eliminar producto' });
    } catch (error) {
      next(error);
    }
  }, errorController);

module.exports = products;
