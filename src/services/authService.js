// const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');
// const { runSchema } = require('./validators');

const authService = {
  validateBody: ({ email, password }) => {
    if (!email || !password) {
      const e = new Error('Some required fields are missing');
      e.name = 'ValidationError';
      throw e;
    }
    return { email, password };
  },

  login: async (email, passwordBody) => {
    const user = await db.User.findOne({
      attributes: { exclude: ['id', 'displayName', 'image', 'createdAt', 'updatedAt'] },
      where: { email },
    });

    if (!user || user.password !== passwordBody) {
      const e = new Error('Invalid fields');
      e.name = 'ValidationError';
      throw e;
    }

    const { password, ...userWithoutPassword } = user.dataValues;

    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },

  validateToken: (token) => {
    const data = jwtService.validateToken(token);

    return data;
  },
};

module.exports = authService;
