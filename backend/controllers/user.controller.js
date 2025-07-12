// controllers/user.controller.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// @desc    Register new user
// @route   POST /api/users/register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

// @desc    Login user
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.profilePic = req.body.profilePic || user.profilePic;
    user.location = req.body.location || user.location;
    user.skillsOffered = req.body.skillsOffered || user.skillsOffered;
    user.skillsWanted = req.body.skillsWanted || user.skillsWanted;
    user.availability = req.body.availability || user.availability;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// @desc    Get all users (for browse/search)
// @route   GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers,
};
