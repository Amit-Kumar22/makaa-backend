const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const normalizeFeatures = (features) => {
  if (!features) return [];
  if (Array.isArray(features)) return features.map((feature) => String(feature).trim()).filter(Boolean);
  return String(features)
    .split(',')
    .map((feature) => feature.trim())
    .filter(Boolean);
};

const parseNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const parseBoolean = (value) => {
  if (value === undefined || value === null) return true;
  if (typeof value === 'boolean') return value;
  const normalized = String(value).toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'yes';
};

const buildProductData = (body) => {
  const {
    name,
    category,
    shortDescription,
    fullDescription,
    price,
    discountPrice,
    features,
    image,
    isActive,
    grade,
    moisture,
  } = body;

  return {
    name,
    category,
    shortDescription,
    fullDescription,
    description: shortDescription,
    price: parseNumber(price),
    discountPrice: parseNumber(discountPrice),
    features: normalizeFeatures(features),
    image,
    isActive: parseBoolean(isActive),
    grade,
    moisture: parseNumber(moisture),
  };
};

// Get all active products for public display
exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Get all active products explicitly
exports.getActive = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Get all products for admin
exports.getAllAdmin = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Get product by ID
exports.getById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Create product
exports.create = async (req, res, next) => {
  try {
    const { name, category, shortDescription, fullDescription, image } = req.body;

    if (!name || !category || !shortDescription || !fullDescription || !image) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const product = new Product(buildProductData(req.body));
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Update product
exports.update = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      buildProductData(req.body),
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Delete product permanently
exports.delete = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const hasValidCloudinaryConfig = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  const invalidValues = ['your_cloud_name', 'your_api_key', 'your_api_secret', ''];
  return [CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET].every(
    (value) => value && !invalidValues.includes(value.trim())
  );
};

// Upload product image
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
        folder: 'makka/products',
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
