const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, mobile: user.mobile, name: user.name, role: 'user' },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  mobile: user.mobile,
  city: user.city,
  state: user.state,
  country: user.country,
  organization: user.organization,
  createdAt: user.createdAt,
});

// POST /api/users/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, mobile, password, city, state, country, organization } = req.body;

    if (!name?.trim()) return res.status(400).json({ message: 'Name is required' });
    if (!email?.trim()) return res.status(400).json({ message: 'Email is required' });
    if (!mobile?.trim()) return res.status(400).json({ message: 'Mobile number is required' });
    if (!password || password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' });

    const emailLower = email.toLowerCase().trim();
    const [existingEmail, existingMobile] = await Promise.all([
      User.findOne({ email: emailLower }),
      User.findOne({ mobile: mobile.trim() }),
    ]);

    if (existingEmail) return res.status(409).json({ message: 'Email already registered' });
    if (existingMobile) return res.status(409).json({ message: 'Mobile number already registered' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name: name.trim(),
      email: emailLower,
      mobile: mobile.trim(),
      password: hashedPassword,
      city: city?.trim() || '',
      state: state?.trim() || '',
      country: country?.trim() || 'India',
      organization: organization?.trim() || '',
    });

    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};

// POST /api/users/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim()) return res.status(400).json({ message: 'Email is required' });
    if (!password) return res.status(400).json({ message: 'Password is required' });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    if (!user.isActive) return res.status(403).json({ message: 'Account is disabled. Contact support.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user);
    res.json({ token, user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(sanitizeUser(user));
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, city, state, country, organization } = req.body;
    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (city !== undefined) updateData.city = city.trim();
    if (state !== undefined) updateData.state = state.trim();
    if (country !== undefined) updateData.country = country.trim();
    if (organization !== undefined) updateData.organization = organization.trim();

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(sanitizeUser(user));
  } catch (error) {
    next(error);
  }
};
