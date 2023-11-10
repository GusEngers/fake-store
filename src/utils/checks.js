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

  __hasErrors() {
    if (!this.errors.length) return false;
    return true;
  }

  addProp(value) {
    this.__props.push(value);
  }

  verify() {
    this.__props.map((prop) => {
      if (prop.required && !this.body.hasOwnProperty(prop.name)) {
        this.errors.push(`The value of the '${prop.name}' property is required`);
      }
      if (prop.type === 'float' && isNaN(parseFloat(this.body[prop.name]))) {
        this.errors.push(
          `The format of the value of the '${prop.name}' property must be 'number' or 'float number'`
        );
      } else if (prop.type === 'number' && isNaN(parseInt(this.body[prop.name]))) {
        this.errors.push(`The format of the value of the '${prop.name}' property must be 'number'`);
      } else if (
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

module.exports = { CheckBody };
