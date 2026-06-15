const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      default: 'Farm Road, Agriculture City, India',
    },
    phone: {
      type: String,
      required: true,
      default: '+91 98765 43210',
    },
    email: {
      type: String,
      required: true,
      default: 'info@makka.com',
    },
    whatsapp: {
      type: String,
      default: '+919876543210',
    },
    googleMapEmbed: {
      type: String,
      default: null,
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
