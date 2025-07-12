// models/Feedback.model.js

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    swap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Swap',
      required: true,
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
