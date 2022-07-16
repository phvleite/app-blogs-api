const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');
const { runSchema } = require('./validators');
const NotFoundError = require('../errors/NotFoundError');

const userService = {
  validateBody: runSchema(Joi.object({
    displayName: Joi.string().required().min(8),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    image: Joi.string(),
  })),

  checkIfExistsEmail: async (email) => {
    const exists = await db.User.findOne({
      attributes: { exclude: ['id', 'displayName', 'image'] },
      where: { email },
    });

    if (exists) {
      const message = 'User already registered';
      throw new NotFoundError(message);
    }
  },

  create: async ({ displayName, email, password, image }) => {
    await db.User.create({ displayName, email, password, image });
    const token = jwtService.createToken({ email });

    return token;
  },
};

module.exports = userService;
