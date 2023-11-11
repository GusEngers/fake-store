const { Category, Product } = require('../config/db');
const ResponseError = require('./errors');

/**
 * Clase para validar `body` según las propiedades y reglas añadidas
 */
class CheckBody {
  constructor({ body, message }) {
    this.message = message;
    this.errors = [];
    this.__props = [];
    this.body = body;
  }

  /**
   * Método para determinar si hay errores después de pasar el body
   * por verificación
   * @returns Un booleano: `false` no hay errores y `true` si hay errores
   */
  __hasErrors() {
    if (!this.errors.length) return false;
    return true;
  }

  /**
   * Método para añadir los campos a validar
   * @param {{name: String, required: Boolean, type: String}} value Un objeto con la siguiente estructura:
   * `{
   *    name: Nombre del campo a validar,
   *    required: Booleano indicando si es un campo requerido,
   *    type: Tipo de dato esperado
   * }`
   */
  addProp(value) {
    this.__props.push(value);
  }

  /**
   * Similar al método `addProp` pero en vez de añadir los campos individualmente,
   * se añaden múltiples campos en un array
   * @param {[{name: String, required: Boolean, type: String}]} values Array de objetos con la siguiente estructura:
   * `[{
   *    name: Nombre del campo a validar,
   *    required: Booleano indicando si es un campo requerido,
   *    type: Tipo de dato esperado
   * }]`
   */
  addProps(values) {
    this.__props = values;
  }

  /**
   * Método para verficar los campos del `body` añadidos con `addProp`
   * @returns Ejecución de `__hasErrors`, verificando si hay algún error en la vaidación
   */
  verify() {
    if (this.body.hasOwnProperty('id')) {
      this.errors.push(`The 'id' field should not be specified`);
    }
    this.__props.map((prop) => {
      const have = this.body.hasOwnProperty(prop.name);
      if (prop.required && !have) {
        this.errors.push(`The value of the '${prop.name}' property is required`);
      }
      if (have && prop.type === 'float' && isNaN(parseFloat(this.body[prop.name]))) {
        this.errors.push(
          `The format of the value of the '${prop.name}' property must be 'number' or 'float number'`
        );
      } else if (have && prop.type === 'number' && isNaN(parseInt(this.body[prop.name]))) {
        this.errors.push(`The format of the value of the '${prop.name}' property must be 'number'`);
      } else if (
        have &&
        typeof this.body[prop.name] !== prop.type &&
        !['float', 'number'].includes(prop.type)
      ) {
        this.errors.push(
          `The format of the value of the '${prop.name}' property must be '${prop.type}'`
        );
      }
    });
    return this.__hasErrors();
  }
}

/**
 * Función que verifica si el número de registros de categorías omitidas no son mayores a los
 * almacenados en la base de datos
 * @param {{offset: number, limit: number}} offset Número de categorías a omitir
 * @param limit Límite de categorías por consulta
 * @param {boolean} r Por defecto es `true`, indicando que debe ser retornado el valor total de los registros
 * @returns Valor total de registros almacenados en la base de datos
 */
async function categoriesLimitAndOffsetCheck({ offset, limit }, r = true) {
  const errors = [];
  if (limit < 1 || limit > 50) {
    const message =
      limit > 50
        ? `'limit' cannot have values greater than 50`
        : `'limit' cannot have values less than 1`;
    errors.push(message);
  }
  if (offset < 0 || offset > 50) {
    const message =
      offset > 50
        ? `'offset' cannot have values greater than 50`
        : `'offset' cannot have values less than 0`;
    errors.push(message);
  }
  if (!!errors.length) {
    throw new ResponseError(`Error setting 'limit' and/or 'offset'`, 400, errors);
  }
  const total = await Category.count();

  if (offset > total) {
    const message = `'offset' should not be greater than the total 'count' of categories, currently 'offset' is ${offset} and total categories is ${total}`;
    throw new ResponseError(message, 400);
  }
  if (r) {
    return total;
  }
}

/**
 * Función que verifica si el número de registros de productos omitidos no son mayores a los
 * almacenados en la base de datos
 * @param {{offset: number, limit: number}} offset Número de categorías a omitir
 * @param limit Límite de productos por consulta
 * @param {boolean} r Por defecto es `true`, indicando que debe ser retornado el valor total de los registros
 * @returns Valor total de registros almacenados en la base de datos
 */
async function productsLimitAndOffsetCheck({ offset, limit }, r = true) {
  const errors = [];
  if (limit < 1 || limit > 50) {
    const message =
      limit > 50
        ? `'limit' cannot have values greater than 50`
        : `'limit' cannot have values less than 1`;
    errors.push(message);
  }
  if (offset < 0 || offset > 50) {
    const message =
      offset > 50
        ? `'offset' cannot have values greater than 50`
        : `'offset' cannot have values less than 0`;
    errors.push(message);
  }
  if (!!errors.length) {
    throw new ResponseError(`Error setting 'limit' and/or 'offset'`, 400, errors);
  }
  const total = await Product.count();

  if (offset > total) {
    const message = `'offset' should not be greater than the total 'count' of products, currently 'offset' is ${offset} and total products is ${total}`;
    throw new ResponseError(message, 400);
  }
  if (r) {
    return total;
  }
}

module.exports = { CheckBody, categoriesLimitAndOffsetCheck, productsLimitAndOffsetCheck };
