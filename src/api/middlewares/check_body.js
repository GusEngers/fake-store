const { CheckBody } = require('../../utils/checks');
const ResponseError = require('../../utils/errors');

/**
 * Middleware que verifica si los datos ingresados por `body` necesarios
 * para crear una nueva categoría son correctos
 */
function checkNewCategory(req, res, next) {
  try {
    const check = new CheckBody({
      body: req.body,
      message: 'Error verifying the data required to create a new category',
    });
    check.addProp({ name: 'name', required: true, type: 'string' });
    check.addProp({ name: 'description', required: true, type: 'string' });

    if (check.verify()) {
      throw new ResponseError(check.message, 400, check.errors);
    }
    next();
  } catch (error) {
    res.status(error.status).json(error.response);
  }
}

/**
 * Middleware que verifica si los datos ingresados por `body` necesarios
 * para crear un nuevo producto son correctos
 */
function checkNewProduct(req, res, next) {
  try {
    const check = new CheckBody({
      body: req.body,
      message: 'Error verifying the data required to create a new product',
    });
    check.addProp({ name: 'name', required: true, type: 'string' });
    check.addProp({ name: 'description', required: true, type: 'string' });
    check.addProp({ name: 'price', required: true, type: 'float' });
    check.addProp({ name: 'categoryId', required: true, type: 'number' });

    if (check.verify()) {
      throw new ResponseError(check.message, 400, check.errors);
    }
    next();
  } catch (error) {
    res.status(error.status).json(error.response);
  }
}

/**
 * Middleware que verifica si los datos ingresados por `body` necesarios
 * para actualizar un producto son correctos
 */
function checkUpdateCategory(req, res, next) {
  try {
    const check = new CheckBody({
      body: req.body,
      message: 'Error verifying the data required to update category',
    });
    check.addProp({ name: 'name', required: false, type: 'string' });
    check.addProp({ name: 'description', required: false, type: 'string' });

    if (check.verify()) {
      throw new ResponseError(check.message, 400, check.errors);
    }
    next();
  } catch (error) {
    res.status(error.status).json(error.response);
  }
}

/**
 * Middleware que verifica si los datos ingresados por `body` necesarios
 * para actualzar un producto son correctos
 */
function checkUpdateProduct(req, res, next) {
  try {
    const check = new CheckBody({
      body: req.body,
      message: 'Error verifying the data required to update product',
    });
    check.addProp({ name: 'name', required: false, type: 'string' });
    check.addProp({ name: 'description', required: false, type: 'string' });
    check.addProp({ name: 'price', required: false, type: 'float' });
    check.addProp({ name: 'categoryId', required: false, type: 'number' });

    if (check.verify()) {
      throw new ResponseError(check.message, 400, check.errors);
    }
    next();
  } catch (error) {
    res.status(error.status).json(error.response);
  }
}

module.exports = { checkNewCategory, checkNewProduct, checkUpdateCategory, checkUpdateProduct };
