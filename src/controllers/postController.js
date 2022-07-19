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

  list: async (_req, res) => {
    const listOfPosts = await postService.list();
    res.status(200).json(listOfPosts);
  },

  // getById: async (req, res) => {
  //   const { id } = userService.validateParamsId(req.params);
  //   await userService.checkIfExistsId(id);
  //   const user = await userService.getById(id);
  //   res.status(200).json(user);
  // },
};

module.exports = postController;
