// services/search.services.js

const User = require('../models/User.model');

const searchUsersBySkillService = async (skillQuery) => {
  if (!skillQuery || skillQuery.trim() === '') {
    throw new Error('Skill is required');
  }

  const regex = new RegExp(skillQuery, 'i'); // case-insensitive match

  const users = await User.find({
    $or: [
      { skillsOffered: { $regex: regex } },
      { skillsWanted: { $regex: regex } },
    ],
  }).select('-password');

  return users;
};

module.exports = {
  searchUsersBySkillService,
};
