const products = require('express').Router();

// Controladores de rutas
const { errorController } = require('../controllers/errorController');
const { addProduct } = require('../controllers/products/add_product');
const { getProducts, getProduct } = require('../controllers/products/get_products');
const { updateProducts, updateProduct } = require('../controllers/products/update_products');
const { deleteProducts, deleteProduct } = require('../controllers/products/delete_products');

// Middlewares de rutas
const { checkNewProduct } = require('../middlewares/check_body');

// Utilidades extras
const { path } = require('../../utils/constants');
const { productsHypermedia } = require('../../utils/hypermedias');

// GESTIONES MASIVAS
products
  .route('/')
  .post(
    checkNewProduct,
    async (req, res, next) => {
      // Middleware que gestiona la creación de nuevos productos
      try {
        const { name, description, price, categoryId } = req.body;
        const product = await addProduct({ name, description, price, categoryId });
        res.setHeader('Location', `${path(req)}/api/products/${product.id}`);
        res.status(201).json(product);
      } catch (error) {
        next(error);
      }
    },
    errorController
  )
  .get(async (req, res, next) => {
    // Middleware que gestiona la visualización de los productos
    try {
      const { limit, offset } = req.query;
      const { total, current, products } = await getProducts({ limit, offset });
      res.json({ total, current, products, paths: productsHypermedia() });
    } catch (error) {
      next(error);
    }
  }, errorController)
  .put(async (req, res, next) => {
    // Middleware que gestiona la actualización masiva de productos
    try {
      const { set, condition } = req.body;
      await updateProducts({ set, condition });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }, errorController)
  .delete(async (req, res, next) => {
    // Middleware que gestiona la eliminación masiva de productos
    try {
      const { condition } = req.body;
      await deleteProducts({ condition });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }, errorController);

// GESTIONES ÚNICAS
products
  .route('/:id')
  .get(async (req, res, next) => {
    // Middleware que gestiona la visualización de un producto
    try {
      const { id } = req.params;
      const product = await getProduct({ id });
      res.json(product);
    } catch (error) {
      next(error);
    }
  }, errorController)
  .put(async (req, res, next) => {
    // Middleware que gestiona la actualización de un producto
    try {
      const { id } = req.params;
      const { set } = req.body;
      await updateProduct({ id, set });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }, errorController)
  .delete(async (req, res, next) => {
    // Middleware que gestiona la eliminación de un producto
    try {
      const { id } = req.params;
      await deleteProduct({ id });
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }, errorController);

module.exports = products;
