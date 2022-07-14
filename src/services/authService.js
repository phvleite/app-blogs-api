const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');
const { runSchema } = require('./validators');

console.log(Joi);
console.log(db);

const authService = {
  validateBody: runSchema(Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  })),

  login: async (email, passwordBody) => {
    const user = await db.User.findOne({
      attributes: { exclude: ['id', 'displayName', 'image'] },
      where: { email },
    });

    if (!user || user.password !== passwordBody) {
      const e = new Error('Invalid fields');
      e.name = 'UnauthorizedError';
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
