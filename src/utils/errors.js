/**
 * Clase personalizada para crear errores relacionados
 * a respuestas de la API Web
 */
class ResponseError extends Error {
  constructor(message, status, errors = undefined) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  get response() {
    const _res = {};
    if (this.errors === undefined) {
      _res.error = this.errors;
    }
    _res.message = this.message;
    _res.status = this.status;
    return _res;
  }
}

module.exports = ResponseError;
