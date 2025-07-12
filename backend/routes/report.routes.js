// routes/report.routes.js

const express = require('express');
const router = express.Router();
const {
  submitReport,
  getAllReports,
  updateReportStatus,
} = require('../controllers/report.controller');

const protect = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

// 👤 Users can submit reports
router.post('/', protect, submitReport);

// 🛡️ Admin can view and update reports
router.get('/', protect, isAdmin, getAllReports);
router.patch('/:id', protect, isAdmin, updateReportStatus);

module.exports = router;
