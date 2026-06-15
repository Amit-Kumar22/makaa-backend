const Enquiry = require('../models/Enquiry');

// Create enquiry
exports.create = async (req, res, next) => {
  try {
    const { name, email, phone, city, productRequirement, message } = req.body;

    // Validation
    if (!name || !email || !phone || !city || !productRequirement || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      city,
      productRequirement,
      message,
    });

    await enquiry.save();
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    next(error);
  }
};

// Get all enquiries
exports.getAll = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    next(error);
  }
};

// Mark enquiry as contacted
exports.markContacted = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { contacted: true, notes: req.body.notes },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json(enquiry);
  } catch (error) {
    next(error);
  }
};

// Delete enquiry
exports.delete = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};
