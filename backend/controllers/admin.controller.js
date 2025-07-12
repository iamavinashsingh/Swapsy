const adminService = require('../services/admin.services');

// --- Users ---

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await adminService.fetchAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

exports.banUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await adminService.setUserBanStatus(userId, true);
    res.json({ success: true, message: 'User banned successfully' });
  } catch (err) {
    next(err);
  }
};

exports.unbanUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await adminService.setUserBanStatus(userId, false);
    res.json({ success: true, message: 'User unbanned successfully' });
  } catch (err) {
    next(err);
  }
};

// --- Skills ---

exports.getPendingSkills = async (req, res, next) => {
  try {
    const skills = await adminService.fetchSkillsByStatus('pending');
    res.json({ success: true, data: skills });
  } catch (err) {
    next(err);
  }
};

exports.approveSkill = async (req, res, next) => {
  try {
    const skillId = req.params.id;
    await adminService.updateSkillStatus(skillId, 'approved');
    res.json({ success: true, message: 'Skill approved' });
  } catch (err) {
    next(err);
  }
};

exports.rejectSkill = async (req, res, next) => {
  try {
    const skillId = req.params.id;
    await adminService.updateSkillStatus(skillId, 'rejected');
    res.json({ success: true, message: 'Skill rejected' });
  } catch (err) {
    next(err);
  }
};

// --- Swaps ---

exports.getAllSwaps = async (req, res, next) => {
  try {
    const swaps = await adminService.fetchAllSwaps();
    res.json({ success: true, data: swaps });
  } catch (err) {
    next(err);
  }
};

exports.getSwapsByStatus = async (req, res, next) => {
  try {
    const status = req.params.status;
    const swaps = await adminService.fetchSwapsByStatus(status);
    res.json({ success: true, data: swaps });
  } catch (err) {
    next(err);
  }
};

// --- Platform Messages ---

exports.sendPlatformMessage = async (req, res, next) => {
  try {
    const { title, message } = req.body;
    // You can extend to save/send messages
    res.json({ success: true, message: 'Platform message sent (dummy)' });
  } catch (err) {
    next(err);
  }
};

// --- Reports ---

exports.downloadUserActivityReport = async (req, res, next) => {
  try {
    // Implement real report generation here
    res.json({ success: true, message: 'User activity report (dummy)' });
  } catch (err) {
    next(err);
  }
};

exports.downloadFeedbackReport = async (req, res, next) => {
  try {
    res.json({ success: true, message: 'Feedback report (dummy)' });
  } catch (err) {
    next(err);
  }
};

exports.downloadSwapStatsReport = async (req, res, next) => {
  try {
    res.json({ success: true, message: 'Swap stats report (dummy)' });
  } catch (err) {
    next(err);
  }
};
