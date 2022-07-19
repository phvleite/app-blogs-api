const Joi = require('joi');
const db = require('../database/models');
const { runSchema } = require('./validators');
const NotFoundError = require('../errors/NotFoundError');

const categoryService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBody: runSchema(Joi.object({
    name: Joi.string().required().min(3),
  })),

  checkIfExistsId: async (id) => {
    const exists = await db.Category.findOne({ where: { id } });

    if (!exists) {
      const message = 'Category does not exist';
      throw new NotFoundError(message);
    }
  },

  checkIfExistsCategory: async (name) => {
    const exists = await db.Category.findOne({
      attributes: { exclude: ['id'] },
      where: { name },
    });

    if (exists) {
      const message = 'Category already registered';
      throw new NotFoundError(message);
    }
  },

  checkIfExistsByArrayOfId: async (arrayOfId) => {
    const categories = await db.Category.findAll({
      where: { id: arrayOfId },
    });

    if (!categories.length) throw new NotFoundError('"categoryIds" not found');

    const listOfCategoriesId = categories.map((category) => category.id);

    for (let i = 0; i < arrayOfId.length; i += 1) {
      if (!listOfCategoriesId.includes(arrayOfId[i])) {
        throw new NotFoundError('"categoryIds" not found');
      }
    }
  },

  create: async ({ name }) => {
    const category = await db.Category.create({ name });

    return category;
  },

  list: async () => {
    const categories = await db.Category.findAll();
    return categories;
  },

  getById: async (id) => {
    const category = await db.Category.findByPk(id);

    return category;
  },
};

module.exports = categoryService;
