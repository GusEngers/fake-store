const payments = require('express').Router();

payments.route('/').get(async (req, res) => {
  try {
    res.json({ msg: 'Pago efectuado' });
  } catch (error) {
    res.json({ msg: 'Pago fallido' });
  }
});

module.exports = payments;
