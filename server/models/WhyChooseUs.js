const mongoose = require('mongoose');

const whyChooseUsSchema = new mongoose.Schema(
{
  sectionTitle: String,
  heading: String,
  description: String,

  leftFeatures: [String],
  rightFeatures: [String],

  stats: [
    {
      value: String,
      label: String,
    }
  ],

  isActive: {
    type: Boolean,
    default: true,
  },
},
{ timestamps: true }
);

module.exports = mongoose.model(
  'WhyChooseUs',
  whyChooseUsSchema
);