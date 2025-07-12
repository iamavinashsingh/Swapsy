// routes/feedback.routes.js

const express = require('express');
const router = express.Router();
const {
  submitFeedback,
  getUserFeedback,
} = require('../controllers/feedback.controller');

const protect = require('../middlewares/auth.middleware');

router.post('/:swapId', protect, submitFeedback);
router.get('/user/:userId', protect, getUserFeedback);

module.exports = router;
