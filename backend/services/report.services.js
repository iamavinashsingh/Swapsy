// services/report.services.js

const Report = require('../models/Report.model');
const User = require('../models/User.model');

const submitReportService = async (reporterId, reportedUser, reason) => {
  if (!reportedUser || !reason) throw new Error('Missing required fields');
  if (reporterId === reportedUser) throw new Error('You cannot report yourself');

  const user = await User.findById(reportedUser);
  if (!user) throw new Error('User not found');

  const report = await Report.create({
    reportedBy: reporterId,
    reportedUser,
    reason,
  });

  return report;
};

const getAllReportsService = async () => {
  return await Report.find()
    .populate('reportedBy', 'name email')
    .populate('reportedUser', 'name email')
    .sort({ createdAt: -1 });
};

const updateReportStatusService = async (reportId, status) => {
  const allowed = ['pending', 'reviewed', 'dismissed'];
  if (!allowed.includes(status)) throw new Error('Invalid status');

  const report = await Report.findById(reportId);
  if (!report) throw new Error('Report not found');

  report.status = status;
  await report.save();

  return report;
};

module.exports = {
  submitReportService,
  getAllReportsService,
  updateReportStatusService,
};
