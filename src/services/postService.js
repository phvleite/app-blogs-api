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
};

module.exports = postService;
