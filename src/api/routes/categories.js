const categories = require('express').Router();

categories
  .route('/')
  .post(async (req, res) => {
    try {
      res.json({ msg: 'Crear categoria' });
    } catch (error) {
      res.json({ msg: 'Error crear categoria' });
    }
  })
  .get(async (req, res) => {
    try {
      res.json({ msg: 'Obtener categorias' });
    } catch (error) {
      res.json({ msg: 'Error obtener categorias' });
    }
  })
  .put(async (req, res) => {
    try {
      res.json({ msg: 'Actualizar categorias' });
    } catch (error) {
      res.json({ msg: 'Error actualizar categorias' });
    }
  })
  .delete(async (req, res) => {
    try {
      res.json({ msg: 'Eliminar categorias' });
    } catch (error) {
      res.json({ msg: 'Error eliminar categorias' });
    }
  });

categories
  .route('/:id')
  .get(async (req, res) => {
    try {
      res.json({ msg: 'Obtener categoria' });
    } catch (error) {
      res.json({ msg: 'Error obtener categoria' });
    }
  })
  .put(async (req, res) => {
    try {
      res.json({ msg: 'Actualizar categoria' });
    } catch (error) {
      res.json({ msg: 'Error actualizar categoria' });
    }
  })
  .delete(async (req, res) => {
    try {
      res.json({ msg: 'Eliminar categoria' });
    } catch (error) {
      res.json({ msg: 'Error eliminar categoria' });
    }
  });

categories.route('/:id/products').get(async (req, res) => {
  try {
    res.json({ msg: 'Obtener productos por categoria' });
  } catch (error) {
    res.json({ msg: 'Error obtener productos por categoria' });
  }
});

module.exports = categories;
