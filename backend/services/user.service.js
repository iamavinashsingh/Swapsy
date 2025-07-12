// services/user.services.js

const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerService = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return { user, token };
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return { user, token };
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  return user;
};

const updateUserProfileService = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  Object.assign(user, updateData);
  await user.save();
  return user;
};

const getAllUsersService = async () => {
  const users = await User.find().select('-password');
  return users;
};

module.exports = {
  registerService,
  loginService,
  getUserById,
  updateUserProfileService,
  getAllUsersService,
};
