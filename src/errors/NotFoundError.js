class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    if (message === 'User already registered') {
      this.code = 409;
    } else {
      this.code = 404;
    }
  }
}

module.exports = NotFoundError;
