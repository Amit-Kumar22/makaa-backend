const express = require('express');
const multer = require('multer');
const path = require('path');
const certificationController = require('../controllers/certificationController');
const authMiddleware = require('../middleware/auth');

// ─── Image upload config ───────────────────────────────────────────────────

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const filename = `cert-${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, filename);
  },
});

const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, JPEG, PNG, WEBP) are allowed'));
  }
};

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// ─── PDF upload config ────────────────────────────────────────────────────

const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const filename = `cert-pdf-${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, filename);
  },
});

const pdfFileFilter = (req, file, cb) => {
  const isPdf =
    file.mimetype === 'application/pdf' ||
    path.extname(file.originalname).toLowerCase() === '.pdf';
  if (isPdf) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

// Max PDF size configurable via env (default 50 MB)
const PDF_MAX_SIZE = parseInt(process.env.PDF_MAX_SIZE_MB || '50', 10) * 1024 * 1024;

const uploadPdf = multer({
  storage: pdfStorage,
  fileFilter: pdfFileFilter,
  limits: { fileSize: PDF_MAX_SIZE },
});

// ─── Routes ───────────────────────────────────────────────────────────────

const router = express.Router();

router.get('/', certificationController.getAll);
router.get('/admin', authMiddleware, certificationController.getAllAdmin);
router.get('/:id', certificationController.getById);
router.post('/upload-image', authMiddleware, uploadImage.single('image'), certificationController.uploadImage);
router.post('/upload-pdf', authMiddleware, uploadPdf.single('pdf'), certificationController.uploadPdf);
router.post('/', authMiddleware, certificationController.create);
router.put('/:id', authMiddleware, certificationController.update);
router.delete('/:id', authMiddleware, certificationController.delete);

module.exports = router;
