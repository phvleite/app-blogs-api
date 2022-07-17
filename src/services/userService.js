const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');
const { runSchema } = require('./validators');
const NotFoundError = require('../errors/NotFoundError');

const userService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBody: runSchema(Joi.object({
    displayName: Joi.string().required().min(8),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    image: Joi.string(),
  })),

  checkIfExistsId: async (id) => {
    const exists = await db.User.findOne({
      attributes: { exclude: ['id', 'displayName', 'image'] },
      where: { id },
    });

    if (!exists) {
      const message = 'User does not exist';
      throw new NotFoundError(message);
    }
  },

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

  list: async () => {
    const users = await db.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },

  getById: async (id) => {
    const user = await db.User.findByPk(id, {
      attributes: { exclude: 'password' },
    });

    return user;
  },
};

module.exports = userService;
