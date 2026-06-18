const path = require('path');
const fs = require('fs');
const WhyChooseUs = require('../models/WhyChooseUs');
const cloudinary = require('cloudinary').v2;

const hasValidCloudinaryConfig = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  const invalid = ['your_cloud_name', 'your_api_key', 'your_api_secret', ''];
  return [CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET].every(
    (v) => v && !invalid.includes(v.trim())
  );
};

const deleteLocalFile = (url) => {
  if (!url || !url.includes('/uploads/')) return;
  const filename = path.basename(url.split('?')[0]);
  fs.unlink(path.join(__dirname, '..', 'uploads', filename), () => {});
};

// GET /api/why-choose-us  (public, active only, sorted)
exports.getAll = async (req, res, next) => {
  try {
    const items = await WhyChooseUs.find({ isActive: true }).sort({ displayOrder: 1, createdAt: 1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// GET /api/why-choose-us/admin  (admin)
exports.getAllAdmin = async (req, res, next) => {
  try {
    const items = await WhyChooseUs.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// GET /api/why-choose-us/:id
exports.getById = async (req, res, next) => {
  try {
    const item = await WhyChooseUs.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// POST /api/why-choose-us  (admin)
exports.create = async (req, res, next) => {
  try {
    const { title, description, imageUrl, displayOrder, isActive } = req.body;
    if (!title?.trim()) return res.status(400).json({ message: 'Title is required' });

    const item = new WhyChooseUs({
      title: title.trim(),
      description: description?.trim() || '',
      imageUrl: imageUrl || '',
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
      isActive: isActive !== undefined ? (String(isActive) === 'true' || isActive === true) : true,
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

// PUT /api/why-choose-us/:id  (admin)
exports.update = async (req, res, next) => {
  try {
    const { title, description, imageUrl, displayOrder, isActive } = req.body;
    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    const data = {};
    if (title !== undefined) data.title = title.trim();
    if (description !== undefined) data.description = description.trim();
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (displayOrder !== undefined) data.displayOrder = Number(displayOrder);
    if (isActive !== undefined) data.isActive = String(isActive) === 'true' || isActive === true;

    const item = await WhyChooseUs.findByIdAndUpdate(req.params.id, data, {
      new: true, runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/why-choose-us/:id  (admin)
exports.delete = async (req, res, next) => {
  try {
    const item = await WhyChooseUs.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    deleteLocalFile(item.imageUrl);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// POST /api/why-choose-us/upload-image  (admin)
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image file uploaded' });

    let imageUrl;

    if (hasValidCloudinaryConfig()) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'makka/why-choose-us',
      });
      imageUrl = result.secure_url;
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
