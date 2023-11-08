const Category = require('../models/category');
const categories = require('express').Router();

// Controladores de rutas
const { errorController } = require('../controllers/errorController');
const { addCategory } = require('../controllers/categories/add_category');

// Utilidades extras
const { path } = require('../../utils/constants');

categories
  .route('/')
  .post(async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const category = await addCategory({ name, description });
      res.setHeader('Location', `${path(req)}/api/categories/${category.id}`);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }, errorController)
  .get(async (req, res, next) => {
    try {
      const category = await Category.create({ name: 'hola', description: 'adsasd' });
      res.json(category);
    } catch (error) {
      next(error);
    }
  }, errorController)
  .put(async (req, res, next) => {
    try {
      res.json({ msg: 'Actualizar categorias' });
    } catch (error) {
      res.json({ msg: 'Error actualizar categorias' });
    }
  })
  .delete(async (req, res, next) => {
    try {
      res.json({ msg: 'Eliminar categorias' });
    } catch (error) {
      next(error);
    }
  }, errorController);

categories
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      res.json({ msg: 'Obtener categoria' });
    } catch (error) {
      next(error);
    }
  }, errorController)
  .put(async (req, res, next) => {
    try {
      res.json({ msg: 'Actualizar categoria' });
    } catch (error) {
      next(error);
    }
  }, errorController)
  .delete(async (req, res) => {
    try {
      res.json({ msg: 'Eliminar categoria' });
    } catch (error) {
      next(error);
    }
  }, errorController);

categories.route('/:id/products').get(async (req, res, next) => {
  try {
    res.json({ msg: 'Obtener productos por categoria' });
  } catch (error) {
    next(error);
  }
}, errorController);

module.exports = categories;
