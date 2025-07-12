// controllers/search.controller.js

const User = require('../models/User.model');

// @desc    Search users by skill (offered or wanted)
// @route   GET /api/search?skill=design
const searchUsersBySkill = async (req, res) => {
  const { skill } = req.query;

  if (!skill || skill.trim() === '') {
    return res.status(400).json({ message: 'Skill query is required' });
  }

  try {
    const regex = new RegExp(skill, 'i'); // case-insensitive search

    const users = await User.find({
      $or: [
        { skillsOffered: { $regex: regex } },
        { skillsWanted: { $regex: regex } },
      ],
    }).select('-password');

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
};

module.exports = {
  searchUsersBySkill,
};
