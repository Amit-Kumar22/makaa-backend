const express = require('express');
const enquiryController = require('../controllers/enquiryController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', enquiryController.create);
router.get('/', authMiddleware, enquiryController.getAll);
router.patch('/:id', authMiddleware, enquiryController.markContacted);
router.delete('/:id', authMiddleware, enquiryController.delete);

module.exports = router;
