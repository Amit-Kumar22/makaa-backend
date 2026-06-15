const express = require('express');
const aboutController = require('../controllers/aboutController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', aboutController.get);
router.put('/', authMiddleware, aboutController.update);

module.exports = router;
