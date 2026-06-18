const express = require('express');
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/whyChooseUsController');
const authMiddleware = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    cb(null, `wcu-${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|svg/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype) || file.mimetype === 'image/svg+xml';
  if (ext && mime) cb(null, true);
  else cb(new Error('Only image files (JPG, PNG, WEBP, SVG) are allowed'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

const router = express.Router();

router.get('/', controller.getAll);
router.get('/admin', authMiddleware, controller.getAllAdmin);
router.get('/:id', controller.getById);
router.post('/upload-image', authMiddleware, upload.single('image'), controller.uploadImage);
router.post('/', authMiddleware, controller.create);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

module.exports = router;
