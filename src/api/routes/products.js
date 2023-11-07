const products = require('express').Router();

products
  .route('/')
  .post(async (req, res) => {
    try {
      res.json({ msg: 'Crear producto' });
    } catch (error) {
      res.json({ msg: 'Error crear producto' });
    }
  })
  .get(async (req, res) => {
    try {
      res.json({ msg: 'Obtener productos' });
    } catch (error) {
      res.json({ msg: 'Error obtener productos' });
    }
  })
  .put(async (req, res) => {
    try {
      res.json({ msg: 'Actualizar productos' });
    } catch (error) {
      res.json({ msg: 'Error actualizar productos' });
    }
  })
  .delete(async (req, res) => {
    try {
      res.json({ msg: 'Eliminar productos' });
    } catch (error) {
      res.json({ msg: 'Error eliminar productos' });
    }
  });

products
  .route('/:id')
  .get(async (req, res) => {
    try {
      res.json({ msg: 'Obtener producto' });
    } catch (error) {
      res.json({ msg: 'Error obtener producto' });
    }
  })
  .put(async (req, res) => {
    try {
      res.json({ msg: 'Actualizar producto' });
    } catch (error) {
      res.json({ msg: 'Error actualizar producto' });
    }
  })
  .delete(async (req, res) => {
    try {
      res.json({ msg: 'Eliminar producto' });
    } catch (error) {
      res.json({ msg: 'Error eliminar producto' });
    }
  });

module.exports = products;
