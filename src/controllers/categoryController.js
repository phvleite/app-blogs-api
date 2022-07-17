const categoryService = require('../services/categoryService');

const categoryController = {
  create: async (req, res) => {
    const { name } = categoryService.validateBody(req.body);
    await categoryService.checkIfExistsCategory(name);
    const category = await categoryService.create({ name });
    res.status(201).json(category);
  },

  list: async (_req, res) => {
    const categories = await categoryService.list();
    res.status(200).json(categories);
  },

  getById: async (req, res) => {
    const { id } = categoryService.validateParamsId(req.params);
    await categoryService.checkIfExistsId(id);
    const category = await categoryService.getById(id);
    res.status(200).json(category);
  },
};

module.exports = categoryController;
