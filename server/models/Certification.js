const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certification title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    // PDF fields
    pdfUrl: {
      type: String,
      default: '',
    },
    pdfName: {
      type: String,
      default: '',
    },
    pdfSize: {
      type: Number,
      default: 0,
    },
    // Certificate metadata
    certificateNumber: {
      type: String,
      trim: true,
      default: '',
    },
    recipientName: {
      type: String,
      trim: true,
      default: '',
    },
    issueDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    organizationName: {
      type: String,
      trim: true,
      default: '',
    },
    certStatus: {
      type: String,
      enum: ['Active', 'Expired', 'Pending', 'N/A'],
      default: 'Active',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

certificationSchema.index({ isActive: 1, displayOrder: 1 });

module.exports = mongoose.model('Certification', certificationSchema);
