const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    productRequirement: {
      type: String,
      required: [true, 'Product requirement is required'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    contacted: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
