const path = require('path');
const Certification = require('../models/Certification');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const parseBoolean = (value) => {
  if (value === undefined || value === null) return true;
  if (typeof value === 'boolean') return value;
  const normalized = String(value).toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'yes';
};

const hasValidCloudinaryConfig = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  const invalidValues = ['your_cloud_name', 'your_api_key', 'your_api_secret', ''];
  return [CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET].every(
    (value) => value && !invalidValues.includes(value.trim())
  );
};

const deleteLocalFile = (fileUrl) => {
  if (!fileUrl || !fileUrl.includes('/uploads/')) return;
  const filename = path.basename(fileUrl.split('?')[0]);
  const filePath = path.join(__dirname, '..', 'uploads', filename);
  fs.unlink(filePath, () => {});
};

// GET /api/certifications — public, only active, sorted by displayOrder
exports.getAll = async (req, res, next) => {
  try {
    const certifications = await Certification.find({ isActive: true }).sort({
      displayOrder: 1,
      createdAt: 1,
    });
    res.json(certifications);
  } catch (error) {
    next(error);
  }
};

// GET /api/certifications/admin — admin, all records
exports.getAllAdmin = async (req, res, next) => {
  try {
    const certifications = await Certification.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });
    res.json(certifications);
  } catch (error) {
    next(error);
  }
};

// GET /api/certifications/:id
exports.getById = async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.json(certification);
  } catch (error) {
    next(error);
  }
};

// POST /api/certifications
exports.create = async (req, res, next) => {
  try {
    const {
      title, description, imageUrl, displayOrder, isActive,
      pdfUrl, pdfName, pdfSize,
      certificateNumber, recipientName, issueDate, expiryDate, organizationName, certStatus,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Certification title is required' });
    }

    const certification = new Certification({
      title: title.trim(),
      description: description ? description.trim() : '',
      imageUrl: imageUrl || '',
      pdfUrl: pdfUrl || '',
      pdfName: pdfName || '',
      pdfSize: pdfSize ? Number(pdfSize) : 0,
      certificateNumber: certificateNumber ? certificateNumber.trim() : '',
      recipientName: recipientName ? recipientName.trim() : '',
      issueDate: issueDate || undefined,
      expiryDate: expiryDate || undefined,
      organizationName: organizationName ? organizationName.trim() : '',
      certStatus: certStatus || 'Active',
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
      isActive: parseBoolean(isActive),
    });

    await certification.save();
    res.status(201).json(certification);
  } catch (error) {
    next(error);
  }
};

// PUT /api/certifications/:id
exports.update = async (req, res, next) => {
  try {
    const {
      title, description, imageUrl, displayOrder, isActive,
      pdfUrl, pdfName, pdfSize,
      certificateNumber, recipientName, issueDate, expiryDate, organizationName, certStatus,
    } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: 'Certification title cannot be empty' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (displayOrder !== undefined) updateData.displayOrder = Number(displayOrder);
    if (isActive !== undefined) updateData.isActive = parseBoolean(isActive);
    if (pdfUrl !== undefined) updateData.pdfUrl = pdfUrl;
    if (pdfName !== undefined) updateData.pdfName = pdfName;
    if (pdfSize !== undefined) updateData.pdfSize = Number(pdfSize);
    if (certificateNumber !== undefined) updateData.certificateNumber = certificateNumber.trim();
    if (recipientName !== undefined) updateData.recipientName = recipientName.trim();
    if (issueDate !== undefined) updateData.issueDate = issueDate || null;
    if (expiryDate !== undefined) updateData.expiryDate = expiryDate || null;
    if (organizationName !== undefined) updateData.organizationName = organizationName.trim();
    if (certStatus !== undefined) updateData.certStatus = certStatus;

    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    res.json(certification);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/certifications/:id
exports.delete = async (req, res, next) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);

    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    // Clean up local files on deletion
    deleteLocalFile(certification.imageUrl);
    deleteLocalFile(certification.pdfUrl);

    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// POST /api/certifications/upload-image
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    let imageUrl;

    if (hasValidCloudinaryConfig()) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'makka/certifications',
      });

      imageUrl = uploadResult.secure_url;
      fs.unlink(req.file.path, () => {});
    } else {
      const protocol = req.protocol;
      const host = req.get('host');
      imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    res.status(201).json({ imageUrl });
  } catch (error) {
    next(error);
  }
};

// POST /api/certifications/upload-pdf
exports.uploadPdf = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }

    const pdfName = req.file.originalname;
    const pdfSize = req.file.size;
    let pdfUrl;

    if (hasValidCloudinaryConfig()) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'makka/certifications/pdfs',
        resource_type: 'raw',
        format: 'pdf',
      });

      pdfUrl = uploadResult.secure_url;
      fs.unlink(req.file.path, () => {});
    } else {
      const protocol = req.protocol;
      const host = req.get('host');
      pdfUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    res.status(201).json({ pdfUrl, pdfName, pdfSize });
  } catch (error) {
    next(error);
  }
};
