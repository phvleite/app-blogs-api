const { Router } = require('express');

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = Router();

router.use(authController.validateToken);
router.post('/', postController.create);
// router.get('/:id', postController.getById);
router.get('/', postController.list);

module.exports = router;
