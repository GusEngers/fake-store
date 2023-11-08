const Category = require('../models/category');
const categories = require('express').Router();

// Controladores de rutas
const { errorController } = require('../controllers/errorController');
const { addCategory } = require('../controllers/categories/add_category');
const { getCategories } = require('../controllers/categories/get_categories');

// Utilidades extras
const { path } = require('../../utils/constants');
const { categoriesHypermedia } = require('../../utils/hypermedias');
const { updateCategories } = require('../controllers/categories/update_categories');

// GESTIONES MASIVAS
categories
  .route('/')
  .post(async (req, res, next) => {
    // Middleware que gestiona la creación de nuevas categorías
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
    // Middleware que gestiona la visualización de las categorías
    try {
      const { limit, offset } = req.query;
      const { total, current, categories } = await getCategories({ limit, offset });
      res.json({ total, current, categories, paths: categoriesHypermedia() });
    } catch (error) {
      next(error);
    }
  }, errorController)
  .put(async (req, res, next) => {
    try {
      const { set, condition } = req.body;
      await updateCategories({ set, condition });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }, errorController)
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
