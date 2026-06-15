const Contact = require('../models/Contact');

// Get contact
exports.get = async (req, res, next) => {
  try {
    let contact = await Contact.findOne();

    // Create default if not exists
    if (!contact) {
      contact = await Contact.create({
        address: 'Farm Road, Agriculture City, India',
        phone: '+91 98765 43210',
        email: 'info@makka.com',
        whatsapp: '+919876543210',
        socialMedia: {
          facebook: 'https://facebook.com/makka',
          instagram: 'https://instagram.com/makka',
          twitter: 'https://twitter.com/makka',
        },
      });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// Update contact
exports.update = async (req, res, next) => {
  try {
    const { address, phone, email, whatsapp, googleMapEmbed, socialMedia } = req.body;

    let contact = await Contact.findOne();

    if (!contact) {
      contact = new Contact({
        address,
        phone,
        email,
        whatsapp,
        googleMapEmbed,
        socialMedia,
      });
    } else {
      contact.address = address || contact.address;
      contact.phone = phone || contact.phone;
      contact.email = email || contact.email;
      contact.whatsapp = whatsapp || contact.whatsapp;
      if (googleMapEmbed) contact.googleMapEmbed = googleMapEmbed;
      if (socialMedia) contact.socialMedia = socialMedia;
    }

    await contact.save();
    res.json(contact);
  } catch (error) {
    next(error);
  }
};
