const express = require('express');
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', contactController.get);
router.put('/', authMiddleware, contactController.update);

module.exports = router;
