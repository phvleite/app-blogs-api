require('dotenv/config');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  existsToken: (token) => {
    if (!token) {
      const message = 'Token not found';
      throw new NotFoundError(message);
    }
  },

  validateToken: (token) => {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.name = 'UnauthorizedError';
      throw error;
    }
  },
};

module.exports = jwtService;
