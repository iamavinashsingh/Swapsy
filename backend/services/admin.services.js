const User = require('../models/User.model');
const Skill = require('../models/Skill.model');
const Swap = require('../models/Swap.model');

exports.fetchAllUsers = async () => {
  return await User.find().select('-password');
};

exports.setUserBanStatus = async (userId, isBanned) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  user.isBanned = isBanned;
  await user.save();
};

exports.fetchSkillsByStatus = async (status) => {
  return await Skill.find({ status });
};

exports.updateSkillStatus = async (skillId, status) => {
  const skill = await Skill.findById(skillId);
  if (!skill) throw new Error('Skill not found');
  skill.status = status;
  await skill.save();
};

exports.fetchAllSwaps = async () => {
  return await Swap.find();
};

exports.fetchSwapsByStatus = async (status) => {
  return await Swap.find({ status });
};
