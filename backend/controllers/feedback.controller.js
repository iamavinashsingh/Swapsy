// controllers/feedback.controller.js

const Feedback = require('../models/Feedback.model');
const Swap = require('../models/Swap.model');

// @desc    Submit feedback for a swap
// @route   POST /api/feedback/:swapId
const submitFeedback = async (req, res) => {
  const { rating, comment } = req.body;
  const { swapId } = req.params;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    const swap = await Swap.findById(swapId);
    if (!swap) return res.status(404).json({ message: 'Swap not found' });

    // Only involved users can submit
    if (
      swap.fromUser.toString() !== req.user.id &&
      swap.toUser.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const recipientUserId =
      swap.fromUser.toString() === req.user.id
        ? swap.toUser
        : swap.fromUser;

    const feedbackExists = await Feedback.findOne({
      swap: swapId,
      fromUser: req.user.id,
    });

    if (feedbackExists) {
      return res.status(400).json({ message: 'You already submitted feedback for this swap' });
    }

    const feedback = await Feedback.create({
      swap: swapId,
      fromUser: req.user.id,
      toUser: recipientUserId,
      rating,
      comment,
    });

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
};

// @desc    Get feedback for a specific user
// @route   GET /api/feedback/user/:userId
const getUserFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ toUser: req.params.userId }).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load feedback' });
  }
};

module.exports = {
  submitFeedback,
  getUserFeedback,
};
