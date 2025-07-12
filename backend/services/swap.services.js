// services/swap.services.js

const Swap = require('../models/Swap.model');

const createSwap = async (fromUser, { toUser, skillOffered, skillWanted, message }) => {
  if (!toUser || !skillOffered || !skillWanted) {
    throw new Error('Missing required fields');
  }

  const swap = await Swap.create({
    fromUser,
    toUser,
    skillOffered,
    skillWanted,
    message,
  });

  return swap;
};

const getSwapsForUser = async (userId) => {
  const sent = await Swap.find({ fromUser: userId }).populate('toUser', 'name email');
  const received = await Swap.find({ toUser: userId }).populate('fromUser', 'name email');

  return { sent, received };
};

const updateSwapStatus = async (swapId, userId, action) => {
  const swap = await Swap.findById(swapId);
  if (!swap) throw new Error('Swap not found');

  if (swap.toUser.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  swap.status = action; // 'accepted' or 'rejected'
  await swap.save();

  return swap;
};

const deletePendingSwap = async (swapId, userId) => {
  const swap = await Swap.findById(swapId);
  if (!swap) throw new Error('Swap not found');

  if (swap.fromUser.toString() !== userId || swap.status !== 'pending') {
    throw new Error('Unauthorized or already processed');
  }

  await swap.deleteOne();
  return true;
};

module.exports = {
  createSwap,
  getSwapsForUser,
  updateSwapStatus,
  deletePendingSwap,
};
