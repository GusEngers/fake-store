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
    const __res = {};
    __res.message = this.message;
    __res.status = this.status;
    if (this.errors !== undefined) {
      __res.errors = this.errors;
    }
    return __res;
  }
}

module.exports = ResponseError;
