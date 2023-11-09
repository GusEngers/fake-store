/**
 * Clase personalizada para crear errores relacionados
 * a respuestas de la API Web
 * @param message Mensaje principal del error
 * @param status Código de estado HTTP del error
 * @param errors Array opcional con mensajes de error adicionales
 */
class ResponseError extends Error {
  constructor(message, status, errors = undefined) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  get response() {
    const _res = {};
    if (this.errors !== undefined) {
      _res.errors = this.errors;
    }
    _res.message = this.message;
    _res.status = this.status;
    return _res;
  }
}

module.exports = ResponseError;
