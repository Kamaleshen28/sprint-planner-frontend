class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

// eslint-disable-next-line no-undef
module.exports = HttpError;
