// models/Swap.model.js

const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema(
  {
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
    skillOffered: {
      type: String,
      required: true,
    },
    skillWanted: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    message: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Swap = mongoose.model('Swap', swapSchema);
module.exports = Swap;
