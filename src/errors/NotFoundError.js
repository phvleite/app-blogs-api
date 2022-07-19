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
    console.log(this.code);
    messageError.forEach((mess) => {
      if (mess.error === message) {
        this.code = mess.code;
        return this.code;
      }
    });
    if (typeof this.code === 'undefined') {
      this.code = 404;
    }
    // switch (message) {
    //   case 'User already registered' || 'Category already registered': this.code = 409; break;
    //   case 'Token not found' || 'Expired or invalid token': this.code = 401; break;
    //   // case 'Some required fields are missing' || '"categoryIds" not found': this.code = 400; break;
    //   default: this.code = 404; break;
    // }
  }
}

module.exports = NotFoundError;
