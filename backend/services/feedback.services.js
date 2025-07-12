// services/feedback.services.js

const Feedback = require('../models/Feedback.model');
const Swap = require('../models/Swap.model');

const submitFeedbackService = async (swapId, currentUserId, rating, comment) => {
  const swap = await Swap.findById(swapId);
  if (!swap) throw new Error('Swap not found');

  // Only involved users can give feedback
  if (
    swap.fromUser.toString() !== currentUserId &&
    swap.toUser.toString() !== currentUserId
  ) {
    throw new Error('Unauthorized');
  }

  const recipientUserId =
    swap.fromUser.toString() === currentUserId
      ? swap.toUser
      : swap.fromUser;

  const feedbackExists = await Feedback.findOne({
    swap: swapId,
    fromUser: currentUserId,
  });

  if (feedbackExists) {
    throw new Error('Feedback already submitted for this swap');
  }

  const feedback = await Feedback.create({
    swap: swapId,
    fromUser: currentUserId,
    toUser: recipientUserId,
    rating,
    comment,
  });

  return feedback;
};

const getFeedbackForUser = async (userId) => {
  const feedbacks = await Feedback.find({ toUser: userId }).sort({ createdAt: -1 });
  return feedbacks;
};

module.exports = {
  submitFeedbackService,
  getFeedbackForUser,
};
