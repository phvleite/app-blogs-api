const Joi = require('joi');
const db = require('../database/models');
const { runSchema } = require('./validators');
const NotFoundError = require('../errors/NotFoundError');
const { sequelize } = require('../database/models');

const postService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validatePost: ({ title, content, categoryIds }) => {
    if (!title || !content || !categoryIds) {
      const message = 'Some required fields are missing';
      throw new NotFoundError(message);
    }
  },

  validateBody: runSchema(Joi.object({
    title: Joi.string().required().min(8),
    content: Joi.string().required().min(8),
    categoryIds: Joi.array().required().min(1).items(Joi.number().integer().min(1)),
  })),

  checkIfExistsId: async (id) => {
    const exists = await db.BlogPost.findOne({ where: { id } });

    if (!exists) {
      const message = 'Post does not exist';
      throw new NotFoundError(message);
    }
  },

  create: async ({ title, content, categoryIds, userId }) => {
    let blogPost;
    await sequelize.transaction(async (t) => {
      blogPost = await db.BlogPost.create({
        title,
        content,
        userId,
        published: Date.now(),
        updated: Date.now(),
      }, { transaction: t });

      const listOfCategories = [];
      categoryIds.forEach((category) => {
        listOfCategories.push({ postId: blogPost.id, categoryId: category });
      });
      
      await db.PostCategory.bulkCreate(listOfCategories, { transaction: t });
    });
    return blogPost.dataValues;
  },

  list: async () => {
    const listOfPosts = db.BlogPost.findAll({
      include: [
      {
        model: db.User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: db.Category,
        as: 'categories',
      },
    ],
    });
    return listOfPosts;
  },

  getById: async (id) => {
    const post = db.BlogPost.findByPk(id, {
      include: [
      {
        model: db.User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: db.Category,
        as: 'categories',
      },
    ],
    });
    return post;
  },
};

module.exports = postService;
