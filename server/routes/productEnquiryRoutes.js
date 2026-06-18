const express = require('express');
const productEnquiryController = require('../controllers/productEnquiryController');
const authMiddleware = require('../middleware/auth');       // admin
const userAuthMiddleware = require('../middleware/userAuth'); // user

const router = express.Router();

// User: create enquiry
router.post('/', userAuthMiddleware, productEnquiryController.create);

// Admin: list / get / update / delete
router.get('/', authMiddleware, productEnquiryController.getAll);
router.get('/:id', authMiddleware, productEnquiryController.getById);
router.patch('/:id', authMiddleware, productEnquiryController.updateStatus);
router.delete('/:id', authMiddleware, productEnquiryController.delete);

module.exports = router;
