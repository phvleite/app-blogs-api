const messageError = [
  {
    error: 'User already registered',
    code: 409,
  },
  {
    error: 'Category already registered',
    code: 409,
  },
  {
    error: 'Token not found',
    code: 401,
  },
  {
    error: 'Unauthorized user',
    code: 401,
  },
  {
    error: 'Expired or invalid token',
    code: 401,
  },
  {
    error: 'Some required fields are missing',
    code: 400,
  },
  {
    error: '"categoryIds" not found',
    code: 400,
  },
];

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    messageError.forEach((mess) => {
      if (mess.error === message) {
        this.code = mess.code;
      }
    });
    if (typeof this.code === 'undefined') {
      this.code = 404;
    }
  }
}

module.exports = NotFoundError;
