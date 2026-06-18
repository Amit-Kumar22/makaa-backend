const express = require('express');
const userController = require('../controllers/userController');
const userAuthMiddleware = require('../middleware/userAuth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userAuthMiddleware, userController.getProfile);
router.put('/profile', userAuthMiddleware, userController.updateProfile);

module.exports = router;
