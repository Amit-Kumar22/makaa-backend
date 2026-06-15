const Product = require('../models/Product');
const Enquiry = require('../models/Enquiry');

// Get dashboard stats
exports.getStats = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalEnquiries = await Enquiry.countDocuments();
    const totalVisitors = 0; // You can implement visitor tracking separately

    res.json({
      totalProducts,
      totalEnquiries,
      totalVisitors,
    });
  } catch (error) {
    next(error);
  }
};
