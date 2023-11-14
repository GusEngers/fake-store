const payments = require('express').Router();

// Controladores de rutas
const { errorController } = require('../controllers/errorController');
const { generatePayment } = require('../controllers/payments/generate_payment');

// Middlewares de rutas
const { checkPaymentsProducts } = require('../middlewares/check_body');

// Utilidades extras
const { paymentsHypermedia } = require('../../utils/hypermedias');

// GESTIÓN DE PAGO
payments.route('/').post(
  checkPaymentsProducts,
  async (req, res, next) => {
    try {
      const { option } = req.query;
      const orders = req.body;
      const { message, total } = await generatePayment({ option, orders });
      res.json({ message, total, paths: paymentsHypermedia() });
    } catch (error) {
      next(error);
    }
  },
  errorController
);

module.exports = payments;
