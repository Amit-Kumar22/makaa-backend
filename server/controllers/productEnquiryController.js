const ProductEnquiry = require('../models/ProductEnquiry');
const User = require('../models/User');

const VALID_STATUSES = ['New', 'Contacted', 'Follow Up', 'Interested', 'Converted', 'Closed'];

// POST /api/product-enquiries  (user auth)
exports.create = async (req, res, next) => {
  try {
    console.log('--- [ProductEnquiry] Received enquiry request ---');
    console.log('[ProductEnquiry] User ID from token:', req.user?.id);

    const { productId, productName, productCategory, productPrice } = req.body;

    console.log('[ProductEnquiry] Product:', { productId, productName, productCategory, productPrice });

    if (!productName?.trim()) {
      return res.status(400).json({ message: 'Product name is required' });
    }

    // Fetch full user details from DB so city/state/org are always populated
    const user = await User.findById(req.user.id).select(
      'name mobile email city state organization'
    );

    if (!user) {
      console.error('[ProductEnquiry] User not found in DB:', req.user.id);
      return res.status(404).json({ message: 'User account not found' });
    }

    console.log('[ProductEnquiry] User details from DB:', {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      city: user.city,
      state: user.state,
      organization: user.organization,
    });

    const enquiry = new ProductEnquiry({
      userId: user._id,
      productId: productId || undefined,
      productName: productName.trim(),
      productCategory: productCategory?.trim() || '',
      productPrice: productPrice?.toString() || '',
      userName: user.name,
      mobile: user.mobile,
      email: user.email,
      city: user.city || '',
      state: user.state || '',
      organizationName: user.organization || '',
      source: 'Website',
    });

    await enquiry.save();

    console.log('[ProductEnquiry] Enquiry saved successfully. ID:', enquiry._id.toString());

    res.status(201).json(enquiry);
  } catch (error) {
    console.error('[ProductEnquiry] Error creating enquiry:', error.message);
    next(error);
  }
};

// GET /api/product-enquiries  (admin auth)
exports.getAll = async (req, res, next) => {
  try {
    const { status, search, startDate, endDate, productId, page = 1, limit = 50 } = req.query;

    const filter = {};

    if (status && VALID_STATUSES.includes(status)) filter.status = status;
    if (productId) filter.productId = productId;

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { userName: regex },
        { mobile: regex },
        { email: regex },
        { productName: regex },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [enquiries, total] = await Promise.all([
      ProductEnquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      ProductEnquiry.countDocuments(filter),
    ]);

    res.json({ enquiries, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
};

// GET /api/product-enquiries/:id  (admin auth)
exports.getById = async (req, res, next) => {
  try {
    const enquiry = await ProductEnquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/product-enquiries/:id  (admin auth)
exports.updateStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const enquiry = await ProductEnquiry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(enquiry);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/product-enquiries/:id  (admin auth)
exports.delete = async (req, res, next) => {
  try {
    const enquiry = await ProductEnquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};
