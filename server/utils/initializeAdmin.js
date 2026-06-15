const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Initialize admin account
const initializeAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      const admin = new Admin({
        name: 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'super_admin',
      });

      await admin.save();
      console.log('✅ Admin account created successfully');
    } else {
      console.log('✅ Admin account already exists');
    }
  } catch (error) {
    console.error('❌ Error initializing admin:', error);
  }
};

module.exports = { initializeAdmin };
