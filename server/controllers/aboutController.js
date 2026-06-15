const About = require('../models/About');

// Get about
exports.get = async (req, res, next) => {
  try {
    let about = await About.findOne();

    // Create default if not exists
    if (!about) {
      about = await About.create({
        title: 'About Makka Premium Maize',
        description: 'We are a leading maize supplier providing premium quality maize...',
        vision: 'Our vision is to become the most trusted maize supplier in the region',
        mission: 'Our mission is to provide premium quality maize products...',
      });
    }

    res.json(about);
  } catch (error) {
    next(error);
  }
};

// Update about
exports.update = async (req, res, next) => {
  try {
    const { title, description, vision, mission, image, companyInfo } = req.body;

    let about = await About.findOne();

    if (!about) {
      about = new About({ title, description, vision, mission, image, companyInfo });
    } else {
      about.title = title || about.title;
      about.description = description || about.description;
      about.vision = vision || about.vision;
      about.mission = mission || about.mission;
      if (image) about.image = image;
      if (companyInfo) about.companyInfo = companyInfo;
    }

    await about.save();
    res.json(about);
  } catch (error) {
    next(error);
  }
};
