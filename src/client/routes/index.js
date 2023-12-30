const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('pages/home');
});

router.get('/docs', (req, res) => {
  res.render('pages/docs');
});

module.exports = router;
