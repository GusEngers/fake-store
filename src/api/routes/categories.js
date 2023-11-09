const Category = require('../models/category');
const categories = require('express').Router();

// Controladores de rutas
const { errorController } = require('../controllers/errorController');
const { addCategory } = require('../controllers/categories/add_category');
const { getCategories, getCategory } = require('../controllers/categories/get_categories');
const { updateCategories, updateCategory } = require('../controllers/categories/update_categories');
const { deleteCategories, deleteCategory } = require('../controllers/categories/delete_categories');

// Utilidades extras
const { path } = require('../../utils/constants');
const { categoriesHypermedia } = require('../../utils/hypermedias');

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
    // Middleware que gestiona la actualización masiva de las categorías
    try {
      const { set, condition } = req.body;
      await updateCategories({ set, condition });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }, errorController)
  .delete(async (req, res, next) => {
    // Middleware que gestiona la eliminación masiva de las categorías
    try {
      const { condition } = req.body;
      await deleteCategories({ condition });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }, errorController);

// GESTIONES ÚNICAS
categories
  .route('/:id')
  .get(async (req, res, next) => {
    // Middleware que gestiona la visualización de una categoría
    try {
      const { id } = req.params;
      const category = await getCategory({ id });
      res.json(category);
    } catch (error) {
      next(error);
    }
  }, errorController)
  .put(async (req, res, next) => {
    // Middleware que gestiona la actualización de una categoría
    try {
      const { id } = req.params;
      const set = req.body;
      await updateCategory({ id, set });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }, errorController)
  .delete(async (req, res) => {
    // Middleware que gestiona la eliminación de una categoría
    try {
      const { id } = req.params;
      await deleteCategory({ id });
      res.status(204).end();
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
