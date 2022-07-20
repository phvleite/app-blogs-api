const postService = require('../services/postService');
const categoryService = require('../services/categoryService');
const jwtService = require('../services/jwtService');

const postController = {
  create: async (req, res) => {
    const { authorization } = req.headers;
    const { data } = jwtService.validateToken(authorization);
    postService.validatePost(req.body);
    const { title, content, categoryIds } = postService.validateBody(req.body);
    await categoryService.checkIfExistsByArrayOfId(categoryIds);
    const blogPost = await postService.create({ title, content, categoryIds, userId: data.id });
    res.status(201).json(blogPost);
  },

  update: async (req, res) => {
    const { id } = postService.validateParamsId(req.params);
    const userId = await postService.checkIfExistsId(id);
    const { authorization } = req.headers;
    const { data } = jwtService.validateToken(authorization);
    postService.validatePostUser(userId, data.id);
    postService.validatePostUpdate(req.body);
    const { title, content } = postService.validateBodyUpdate(req.body);
    await postService.update({ title, content, id });
    const upPost = await postService.getById(id);
    res.status(200).json(upPost);
  },

  list: async (_req, res) => {
    const listOfPosts = await postService.list();
    res.status(200).json(listOfPosts);
  },

  getById: async (req, res) => {
    const { id } = postService.validateParamsId(req.params);
    await postService.checkIfExistsId(id);
    const post = await postService.getById(id);
    res.status(200).json(post);
  },
};

module.exports = postController;
