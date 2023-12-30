const express = require('express');
const path = require('path');
const { allHypermedia } = require('./utils/hypermedias');

const api = require('./api/routes');
const client = require('./client/routes');

const handleHeaders = require('./utils/handleHeaders');
const handleNotFound = require('./utils/handleNotFound');
const handleGlobalError = require('./utils/handleGlobalError');

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(require('morgan')('dev'));
app.use(handleHeaders);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');

// app.get('/', (req, res) => {
//   res.send(`
//   <body style="display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;background-color:black">
//     <h1>FakeStore API</h1>
//     ${allHypermedia().map((path) => `<p>${path.action} - ${path.href}</p>`)}
//   </body>
//   `);
// });

app.use('/', client);
app.use('/api', api);
app.use(handleNotFound);
app.use(handleGlobalError);

module.exports = app;
