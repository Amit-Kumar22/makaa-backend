const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'About Makka Premium Maize',
    },
    description: {
      type: String,
      required: true,
      default: 'We are a leading maize supplier...',
    },
    vision: {
      type: String,
      required: true,
      default: 'Our vision is to become the most trusted maize supplier...',
    },
    mission: {
      type: String,
      required: true,
      default: 'Our mission is to provide premium quality maize...',
    },
    image: {
      type: String,
      default: null,
    },
    companyInfo: {
      foundedYear: Number,
      employees: Number,
      production: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
