const { Router } = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = Router();

router.post('/', userController.create);

router.use(authController.validateToken);
router.get('/:id', userController.getById);
router.get('/', userController.list);

module.exports = router;
