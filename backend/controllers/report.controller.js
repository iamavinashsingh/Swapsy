// controllers/report.controller.js

const Report = require('../models/Report.model');
const User = require('../models/User.model');

// @desc    Submit a report against a user
// @route   POST /reports
const submitReport = async (req, res) => {
  const { reportedUser, reason } = req.body;

  if (!reportedUser || !reason) {
    return res.status(400).json({ message: 'Both reportedUser and reason are required' });
  }

  if (reportedUser === req.user.id) {
    return res.status(400).json({ message: 'You cannot report yourself' });
  }

  try {
    const userExists = await User.findById(reportedUser);
    if (!userExists) {
      return res.status(404).json({ message: 'User to report not found' });
    }

    const report = await Report.create({
      reportedBy: req.user.id,
      reportedUser,
      reason,
    });

    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit report' });
  }
};

// @desc    Get all reports (Admin only)
// @route   GET /reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reportedBy', 'name email')
      .populate('reportedUser', 'name email')
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
};

// @desc    Update report status (Admin only)
// @route   PATCH /reports/:id
const updateReportStatus = async (req, res) => {
  const { status } = req.body;

  if (!['pending', 'reviewed', 'dismissed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    report.status = status;
    await report.save();

    res.json({ message: 'Report status updated', report });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update report' });
  }
};

module.exports = {
  submitReport,
  getAllReports,
  updateReportStatus,
};
