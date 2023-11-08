const express = require('express');
const api = require('./api/routes');

const handleNotFound = require('./utils/handleNotFound');
const handleGlobalError = require('./utils/handleGlobalError');

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(require('morgan')('dev'));

app.use('/api', api);
app.use(handleNotFound);
app.use(handleGlobalError);

module.exports = app;
