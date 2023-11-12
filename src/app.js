const express = require('express');
const api = require('./api/routes');

const { categoriesHypermedia, productsHypermedia } = require('./utils/hypermedias');

const handleNotFound = require('./utils/handleNotFound');
const handleGlobalError = require('./utils/handleGlobalError');

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(require('morgan')('dev'));

app.get('/', (req, res) => {
  const options = { limit: 10, offset: 0 };
  res.send(`
  <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;background-color:black">
    <h1>FakeStore API</h1>
    ${categoriesHypermedia(options)
      .concat(productsHypermedia(options))
      .map((path) => `<p>${path.action} - ${path.href}</p>`)}
  </body>
  `);
});

app.use('/api', api);
app.use(handleNotFound);
app.use(handleGlobalError);

module.exports = app;
