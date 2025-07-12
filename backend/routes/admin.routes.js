const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const isAdmin = require('../middlewares/isAdmin.middleware');

router.use(isAdmin);

// User moderation
router.get('/users', adminController.getAllUsers);
router.patch('/users/:id/ban', adminController.banUser);
router.patch('/users/:id/unban', adminController.unbanUser);

// Skill moderation
router.get('/skills/pending', adminController.getPendingSkills);
router.patch('/skills/:id/approve', adminController.approveSkill);
router.patch('/skills/:id/reject', adminController.rejectSkill);

// Swaps monitoring
router.get('/swaps', adminController.getAllSwaps);
router.get('/swaps/:status', adminController.getSwapsByStatus); // e.g. pending, accepted, cancelled

// Platform-wide messages (just dummy endpoint)
router.post('/messages', adminController.sendPlatformMessage);

// Reports download (dummy placeholders)
router.get('/reports/user-activity', adminController.downloadUserActivityReport);
router.get('/reports/feedback', adminController.downloadFeedbackReport);
router.get('/reports/swap-stats', adminController.downloadSwapStatsReport);

module.exports = router;
