const mongoose = require('mongoose');

const ENQUIRY_STATUSES = ['New', 'Contacted', 'Follow Up', 'Interested', 'Converted', 'Closed'];

const productEnquirySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    productCategory: { type: String, trim: true, default: '' },
    productPrice: { type: String, trim: true, default: '' },
    userName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    city: { type: String, trim: true, default: '' },
    state: { type: String, trim: true, default: '' },
    organizationName: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ENQUIRY_STATUSES,
      default: 'New',
    },
    notes: { type: String, default: '' },
    source: { type: String, default: 'Website' },
  },
  { timestamps: true }
);

productEnquirySchema.index({ status: 1, createdAt: -1 });
productEnquirySchema.index({ userId: 1 });
productEnquirySchema.index({ productId: 1 });

module.exports = mongoose.model('ProductEnquiry', productEnquirySchema);
