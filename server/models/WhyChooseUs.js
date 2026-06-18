const mongoose = require('mongoose');

// Each document is ONE individual "reason" card shown on the website
const whyChooseUsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
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

whyChooseUsSchema.index({ isActive: 1, displayOrder: 1 });

module.exports = mongoose.model('WhyChooseUs', whyChooseUsSchema);
