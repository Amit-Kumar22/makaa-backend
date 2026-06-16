const WhyChooseUs = require('../models/WhyChooseUs');

exports.getAll = async (req, res) => {
  const data = await WhyChooseUs.find({ isActive: true });
  res.json(data);
};

exports.getAllAdmin = async (req, res) => {
  const data = await WhyChooseUs.find();
  res.json(data);
};

exports.getById = async (req, res) => {
  const item = await WhyChooseUs.findById(req.params.id);
  res.json(item);
};

exports.create = async (req, res) => {
  const item = await WhyChooseUs.create(req.body);
  res.status(201).json(item);
};

exports.update = async (req, res) => {
  const item = await WhyChooseUs.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(item);
};

exports.delete = async (req, res) => {
  await WhyChooseUs.findByIdAndDelete(req.params.id);

  res.json({
    message: 'Deleted Successfully',
  });
};