class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';

    switch (message) {
      case 'User already registered': this.code = 409; break;
      case 'Token not found': this.code = 401; break;
      case 'Expired or invalid token': this.code = 401; break;
      default: this.code = 404; break;
    }
  }
}

module.exports = NotFoundError;
